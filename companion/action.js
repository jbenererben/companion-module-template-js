module.exports = function (self) {
	self.setActionDefinitions({
		// Diğer actionlar burada olabilir
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
				const ip = self.config.ip || '127.0.0.1';
				const screenId = event.options.screen_id;
				const url = `http://${ip}:19998/unico/v1/layers/list-detail`;

				try {
					const res = await self.system.emit('http_get', url, {});
					// Eğer Companion 3'te context.http.get varsa onu da kullanabilirsin, örnek:
					// const res = await context.http.get(url);

					// Burada response içindeki layerlardan ilgili screen’e ait ve PVW olanları bulacaksın
					if (res.data && res.data.data && res.data.data.list) {
						const pvwLayers = res.data.data.list.filter(l =>
							l.layerIdObj && l.layerIdObj.attachScreenId === screenId &&
							l.UMD && l.UMD.some(u => (u.name || '').toUpperCase().includes('PVW'))
						)
						console.log('Seçilen Screen’in PVW Layerları:', pvwLayers)
					} else {
						console.log('Veri bulunamadı');
					}
				} catch (err) {
					console.log('HTTP isteğinde hata:', err);
				}
			},
		},
	})
}
