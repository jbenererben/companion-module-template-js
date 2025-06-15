module.exports = function (self) {
	self.setPresetDefinitions([
		// 8 adet PVW Layer tuşu
		...Array.from({ length: 8 }).map((_, i) => ({
			category: 'PVW Layer Seçiciler',
			label: `L${i + 1} Layer`,
			bank: {
				style: 'text',
				text: `$(p20-layerselect:layer_name_${i + 1})`, // Modül ID'sini güncelledim
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
						screen_id: 1, // Default screen ID
						layer_id: '', // Bu action çalıştığında dinamik olarak set edilecek
					},
				},
			],
		})),

		// PVW Layerları Yenile Tuşu
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
					options: {},
				},
			],
			feedbacks: [],
		},
	])
}
