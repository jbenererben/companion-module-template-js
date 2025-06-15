module.exports = function (self) {
  self.lastScreenId = 1 // Varsayılan ilk değer

  self.setActionDefinitions({
    // 1. PVW Layerları Çek ve isimleri variable'a yaz
    get_pvw_layers: {
      name: 'Seçili Screen’in PVW Layerlarını ve İsimlerini Çek',
      options: [
        {
          id: 'screen_id',
          type: 'number',
          label: 'Screen ID (Boş bırakılırsa son seçilen kullanılır)',
          default: undefined,
          min: 1,
          optional: true,
        },
      ],
      callback: async (event) => {
        const ip = self.config.host || self.config.ip || '127.0.0.1'
        const screenId = event.options.screen_id || self.lastScreenId || 1
        self.lastScreenId = screenId // Kaydet

        const url = `http://${ip}:19998/unico/v1/layers/list-detail`

        try {
          const res = await self.system.emit('http_get', url, {})
          if (res.data && res.data.data && Array.isArray(res.data.data.list)) {
            const pvwLayers = res.data.data.list.filter(l =>
              l.layerIdObj && l.layerIdObj.attachScreenId === screenId &&
              l.UMD && l.UMD.some(u => (u.name || '').toUpperCase().includes('PVW'))
            )
            for (let i = 1; i <= 8; i++) {
              // Her seferinde tüm isimleri sıfırla, var olanı güncelle
              const lay = pvwLayers.find(l =>
                (l.serial === i) || (l.general && l.general.serial === i)
              )
              self.setVariable(`layer_name_${i}`, lay ? (lay.name || `L${i}`) : `L${i}`)
            }
          } else {
            console.log('Veri bulunamadı')
          }
        } catch (err) {
          console.log('HTTP isteğinde hata:', err)
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
        },
      ],
      callback: async (event) => {
        const ip = self.config.host || self.config.ip || '127.0.0.1'
        const screenId = self.lastScreenId || 1
        const serial = event.options.serial
        const url = `http://${ip}:19998/unico/v1/layers/list-detail`

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
            // Her actionda variable'ı güncelle
            self.setVariable(`layer_name_${serial}`, targetLayer ? (targetLayer.name || `L${serial}`) : `L${serial}`)

            if (targetLayer) {
              // Toggle mantığı
              if (
                self.selectedLayer &&
                self.selectedLayer.screenId == screenId &&
                self.selectedLayer.layerId == (targetLayer.layerId || targetLayer.id)
              ) {
                self.selectedLayer = null // Deselect
              } else {
                self.selectedLayer = { screenId, layerId: targetLayer.layerId || targetLayer.id }
              }
              self.checkFeedbacks('layer_selected')
            }
          } else {
            console.log('Veri bulunamadı')
          }
        } catch (err) {
          console.log('HTTP isteğinde hata:', err)
        }
      },
    }
  })
}
