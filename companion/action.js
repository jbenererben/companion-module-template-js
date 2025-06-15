module.exports = function (self) {
  self.selectedScreenId = 1 // Varsayılan ilk değer

  self.setActionDefinitions({
    // 0. Aktif screen ID ayarlama (Başka modülden tetiklenecek)
    set_active_screen: {
      name: 'Aktif Screen ID Ayarla',
      options: [
        {
          id: 'screen_id',
          type: 'number',
          label: 'Screen ID',
          default: 1,
          min: 1,
        },
      ],
      callback: async (event) => {
        self.selectedScreenId = event.options.screen_id
        self.log('info', `Aktif Screen ID: ${self.selectedScreenId}`)
        // Hemen ardından layer isimlerini güncelle
        self.performAction('get_pvw_layers', {})
      },
    },

    // 1. PVW Layerları Çek ve isimleri variable'a yaz
    get_pvw_layers: {
      name: 'Seçili Screen\'in PVW Layerlarını ve İsimlerini Çek',
      options: [],
      callback: async () => {
        const ip = self.config.host || '127.0.0.1'
        const port = self.config.port || '19998'
        const screenId = self.selectedScreenId || 1

        const url = `http://${ip}:${port}/unico/v1/layers/list-detail`

        try {
          const res = await self.system.emit('http_get', url, {})
          if (res.data && res.data.data && Array.isArray(res.data.data.list)) {
            const pvwLayers = res.data.data.list.filter(l =>
              l.layerIdObj && l.layerIdObj.attachScreenId === screenId &&
              l.UMD && l.UMD.some(u => (u.name || '').toUpperCase().includes('PVW'))
            )
            
            // Layer isimlerini variable'lara yaz
            for (let i = 1; i <= 8; i++) {
              const lay = pvwLayers.find(l =>
                (l.serial === i) || (l.general && l.general.serial === i)
              )
              self.setVariableValue(`layer_name_${i}`, lay ? (lay.name || `L${i}`) : `L${i}`)
            }
            
            self.log('info', `${pvwLayers.length} PVW layer bulundu`)
          } else {
            self.log('warn', 'PVW layer verisi bulunamadı')
          }
        } catch (err) {
          self.log('error', `HTTP isteğinde hata: ${err.message}`)
        }
      },
    },

    // 2. Serial ile PVW Layer bulucu + toggle seçme + layer adını variable'a yaz
    get_pvw_layer_by_serial: {
      name: 'PVW Layerı Serial ile Seç',
      options: [
        {
          id: 'serial',
          type: 'number',
          label: 'Layer Serial (L1 için 1, L2 için 2, vb)',
          default: 1,
          min: 1,
          max: 8,
        },
      ],
      callback: async (event) => {
        const ip = self.config.host || '127.0.0.1'
        const port = self.config.port || '19998'
        const screenId = self.selectedScreenId || 1
        const serial = event.options.serial
        const url = `http://${ip}:${port}/unico/v1/layers/list-detail`

        try {
          const res = await self.system.emit('http_get', url, {})
          if (res.data && res.data.data && Array.isArray(res.data.data.list)) {
            const pvwLayers = res.data.data.list.filter(l =>
              l.layerIdObj && l.layerIdObj.attachScreenId === screenId &&
              l.UMD && l.UMD.some(u => (u.name || '').toUpperCase().includes('PVW'))
            )
            
            const targetLayer = pvwLayers.find(
              l => l.serial === serial ||
              (l.general && l.general.serial === serial)
            )
            
            // Layer adını variable'a yaz
            self.setVariableValue(`layer_name_${serial}`, targetLayer ? (targetLayer.name || `L${serial}`) : `L${serial}`)

            if (targetLayer) {
              const layerId = targetLayer.layerId || targetLayer.id
              
              // Toggle mantığı - aynı layer'a tekrar basıldıysa deselect et
              if (
                self.selectedLayer &&
                self.selectedLayer.screenId == screenId &&
                self.selectedLayer.layerId == layerId
              ) {
                self.selectedLayer = null // Deselect
                self.log('info', `Layer L${serial} seçimi kaldırıldı`)
              } else {
                self.selectedLayer = { screenId, layerId }
                self.log('info', `Layer L${serial} seçildi (ID: ${layerId})`)
              }
              
              // Feedback'leri güncelle
              self.checkFeedbacks('layer_selected')
            } else {
              self.log('warn', `L${serial} seriali layer bulunamadı`)
            }
          } else {
            self.log('warn', 'Layer verisi bulunamadı')
          }
        } catch (err) {
          self.log('error', `HTTP isteğinde hata: ${err.message}`)
        }
      },
    }
  })
}
