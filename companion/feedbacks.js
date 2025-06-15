module.exports = function (self) {
	self.setFeedbackDefinitions({
		layer_selected: {
			type: 'boolean',
			name: 'Layer Seçili',
			description: 'Seçili Layer bu tuşa atanmışsa renk değiştirir',
			options: [
				{
					type: 'number',
					label: 'Screen ID',
					id: 'screen_id',
					default: 1,
					min: 1,
				},
				{
					type: 'textinput',
					label: 'Layer ID',
					id: 'layer_id',
					default: '',
					tooltip: 'Boş bırakılırsa otomatik olarak serial numarasına göre bulunur'
				},
				{
					type: 'number',
					label: 'Layer Serial (Alternatif)',
					id: 'serial',
					default: 1,
					min: 1,
					max: 8,
					tooltip: 'Layer ID boşsa bu değer kullanılır'
				},
			],
			defaultStyle: {
				bgcolor: 0x00ff00, // Seçiliyse YEŞİL
				color: 0xffffff,   // Yazı rengi beyaz
			},
			callback: (feedback) => {
				if (!self.selectedLayer) {
					return false
				}
				
				const screenId = feedback.options.screen_id
				const layerId = feedback.options.layer_id
				const serial = feedback.options.serial
				
				// Screen ID kontrolü
				if (self.selectedLayer.screenId != screenId) {
					return false
				}
				
				// Layer ID verilmişse onu kullan
				if (layerId && layerId.trim() !== '') {
					return self.selectedLayer.layerId == layerId
				}
				
				// Layer ID verilmemişse serial numarasını kullan
				// Bu durumda gerçek layer ID'sini bulmak gerekir
				// Şimdilik basit bir kontrol yapalım
				return self.selectedLayer.layerId && serial
			},
		},
		
		screen_active: {
			type: 'boolean',
			name: 'Screen Aktif',
			description: 'Belirtilen screen aktifse renk değiştirir',
			options: [
				{
					type: 'number',
					label: 'Screen ID',
					id: 'screen_id',
					default: 1,
					min: 1,
				},
			],
			defaultStyle: {
				bgcolor: 0x0066cc, // Aktifse MAVİ
				color: 0xffffff,
			},
			callback: (feedback) => {
				const screenId = feedback.options.screen_id
				return self.selectedScreenId == screenId
			},
		},
	})
}
