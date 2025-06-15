module.exports = function (self) {
	const variables = []
	
	// 8 adet layer adı variable'ı tanımla
	for (let i = 1; i <= 8; i++) {
		variables.push({ 
			variableId: `layer_name_${i}`, 
			name: `L${i} Layer Adı`,
			defaultValue: `L${i}` // Varsayılan değer ekle
		})
	}
	
	// Ek bilgi variable'ları
	variables.push({
		variableId: 'selected_screen_id',
		name: 'Seçili Screen ID',
		defaultValue: '1'
	})
	
	variables.push({
		variableId: 'selected_layer_id',
		name: 'Seçili Layer ID',
		defaultValue: ''
	})
	
	self.setVariableDefinitions(variables)
	
	// Varsayılan değerleri set et
	for (let i = 1; i <= 8; i++) {
		self.setVariableValue(`layer_name_${i}`, `L${i}`)
	}
	self.setVariableValue('selected_screen_id', '1')
	self.setVariableValue('selected_layer_id', '')
}
