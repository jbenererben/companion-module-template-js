module.exports = function (self) {
	self.setPresetDefinitions([
		...Array.from({ length: 8 }).map((_, i) => ({
			category: 'PVW Layer Seçiciler',
			label: `L${i + 1} Layer`,
			bank: {
				style: 'text',
				text: `L${i + 1}`, // İstersen layer ismini dinamik de çekebiliriz!
				size: '18',
				color: 16777215,
				bgcolor: 0,
			},
			actions: [
				{
					action: 'get_pvw_layer_by_serial',
					options: {
						serial: i + 1, // Sadece serial!
					},
				},
			],
			feedbacks: [
				{
					feedbackId: 'layer_selected',
					options: {
						serial: i + 1, // Feedback de sadece serial ile kontrol edecek
					},
				},
			],
		})),
	])
}
