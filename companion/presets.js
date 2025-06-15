module.exports = function (self) {
	self.setPresetDefinitions([
		...Array.from({ length: 8 }).map((_, i) => ({
			category: 'PVW Layer Seçiciler',
			label: `L${i + 1} Layer`,
			bank: {
				style: 'text',
				text: `$(layer_name_${i + 1})`, // Dinamik layer adı!
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
						// Son seçilen screen ve layerId ile kontrol edilecek,
						// Ancak burada sadece serial veriyoruz, action'da variable güncelleniyor olacak
						serial: i + 1
					},
				},
			],
		})),
	])
}
