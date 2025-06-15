// companion/feedbacks.js
module.exports = function (self) {
	self.setFeedbackDefinitions({
		layer_selected: {
			type: 'boolean',
			name: 'Layer seçili',
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
				},
			],
			defaultStyle: {
				bgcolor: 0x00ff00, // Seçiliyse YEŞİL
				color: 0xffffff,   // Yazı rengi beyaz
			},
			callback: (feedback, context) => {
				const screenId = feedback.options.screen_id
				const layerId = feedback.options.layer_id
				return (
					self.selectedLayer &&
					self.selectedLayer.screenId == screenId &&
					self.selectedLayer.layerId == layerId
				)
			},
		},
	})
}
