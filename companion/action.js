module.exports = function (self) {
  self.setActionDefinitions({
    // 1. PVW Layerları Çek ve isimleri variable'a yaz
    get_pvw_layers: {
      name: 'Seçili Screen’in PVW Layerlarını ve İsimlerini Çek',
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
        const ip = self.config.host || self.config.ip || '127.0.0.1'
        const screenId = event.options.screen_id
        const url = `http://${ip}:19998/unico/v1/layers/list-detail`

        try {
          const res = await self.system.emit('http_get', url, {})
          if (res.data && res.data.data && Array.isArray(res.data.data.list)) {
            const pvwLayers = res.data.data.list.filter(l =>
              l.layerIdObj && l.layerIdObj.attachScreenId === screenId &&
              l.UMD && l.UMD.some(u => (u.name || '').toUpperCase().includes('PVW'))
            )

            // Adımlı: Her serial için variable'a isim yaz!
            for (const layer of pvwLayers) {
              const serial = layer.serial || (layer.general && layer.general.serial)
              if (serial) {
                self.setVariable(`layer_name_${serial}`, layer.name || `L${serial}`)
              }
            }
            console.log('PVW Layerlar ve İsimleri Güncellendi:', pvwLayers)
          } else {
            console.log('Veri bulunamadı')
          }
        } catch (err) {
          console.log('HTTP isteğinde hata:', err)
        }
      },
    },

    // 2. Serial ile PVW Layer bulucu + toggle seçme
    get_pvw_layer_by_serial: {
      name: 'PVW Layerı Serial ile Seç',
      options: [
        {
          id: 'screen_id',
          type: 'number',
          label: 'Screen ID',
          default: 1,
          min: 1,
        },
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
        const screenId = event.options.screen_id
        const serial = event.options.serial
        const url = `http://${ip}:19998/unico/v1/layers/list-detail`

        try {
          const res = await self.system.emit('http_get', url, {})
          if (res.data && res.data.data && Array.isArray(res.data.data.list)) {
            const pvwLayers = res.data.data.list.filter(l =>
              l.layerIdObj && l.layerIdObj.attachScreenId === screenId &&
              l.UMD && l.UMD.some(u => (u.name || '').toUpperCase().includes('PVW'))
            )
            // Serial, bazen doğrudan, bazen l.general.serial içinde olabilir
            const targetLayer = pvwLayers.find(
              l => l.serial === serial ||
              (l.general && l.general.serial === serial)
            )
            if (targetLayer) {
              // Toggle mantığı: Eğer seçiliyse kaldır, değilse seç
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
              console.log(`Screen ${screenId} PVW'deki L${serial}:`, targetLayer)
            } else {
              console.log(`Screen ${screenId} PVW'de serial ${serial} bulunamadı.`)
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
