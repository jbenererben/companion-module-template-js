module.exports = function (self) {
	self.setPresetDefinitions([
		// 8 adet PVW Layer tuşu
		...Array.from({ length: 8 }).map((_, i) => ({
			category: 'PVW Layer Seçiciler',
			label: `L${i + 1} Layer`,
			bank: {
				style: 'text',
				text: `$(P20_LayerSelect:layer_name_${i + 1})`, // Dinamik layer adı (modül adını değiştirmeyi unutma!)
				size: '18',
				color: 16777215,
				bgcolor: 0,
			},
			actions: [
				{
					action: 'get_pvw_layer_by_serial',
					options: {
						serial: i + 1,
					},
				},
			],
			feedbacks: [
				{
					feedbackId: 'layer_selected',
					options: {
						serial: i + 1
					},
				},
			],
		})),

		// ---- YENİ: PVW Layerları Yenile Tuşu ----
		{
			category: 'PVW Layer Seçiciler',
			label: 'PVW Layerları Yenile',
			bank: {
				style: 'text',
				text: 'PVW Layerları\nYenile',
				size: '14',
				color: 0xffffff,
				bgcolor: 0x003399,
			},
			actions: [
				{
					action: 'get_pvw_layers',
					options: {
						// Ekran seçimini modül içinden çekecek
					},
				},
			],
			feedbacks: [],
		},
	])
}
