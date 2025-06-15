module.exports = function (self) {
	self.setActionDefinitions({
		// 1. Action: PVW Layerlarını Konsola Yazdır
		get_pvw_layers: {
			name: 'Seçili Screen’in PVW Layerlarını Çek',
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
				const ip = self.config.ip || '127.0.0.1'
				const screenId = event.options.screen_id
				const url = `http://${ip}:19998/unico/v1/layers/list-detail`

				try {
					const res = await self.system.emit('http_get', url, {})
					// Response içindeki layerlardan, ilgili screen’e ait ve PVW olanları buluyoruz
					if (res.data && res.data.data && res.data.data.list) {
						const pvwLayers = res.data.data.list.filter(l =>
							l.layerIdObj && l.layerIdObj.attachScreenId === screenId &&
							l.UMD && l.UMD.some(u => (u.name || '').toUpperCase().includes('PVW'))
						)
						console.log('Seçilen Screen’in PVW Layerları:', pvwLayers)
					} else {
						console.log('Veri bulunamadı')
					}
				} catch (err) {
					console.log('HTTP isteğinde hata:', err)
				}
			},
		},

		// 2. Action: PVW Layer Seçtir
		select_pvw_layer: {
			name: 'PVW Layer Seç',
			options: [
				{
					id: 'screen_id',
					type: 'number',
					label: 'Screen ID',
					default: 1,
					min: 1,
				},
				{
					id: 'layer_id',
					type: 'textinput',
					label: 'Layer ID',
					default: '',
				},
			],
			callback: async (event) => {
				// Burada da layer seçme ve/veya input atama işlemlerini yapacağız
				const ip = self.config.ip || '127.0.0.1'
				const screenId = event.options.screen_id
				const layerId = event.options.layer_id
				console.log(`Seçilen Screen: ${screenId}, Seçilen Layer: ${layerId}`)
				// Buraya ileride layerı aktive edecek veya input atayacak kodu ekleyeceğiz!
			},
		}
	})
},
