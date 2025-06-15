module.exports = function (self) {
	const variables = []
	for (let i = 1; i <= 8; i++) {
		variables.push({ variableId: `layer_name_${i}`, name: `L${i} Layer Adı` })
	}
	self.setVariableDefinitions(variables)
}
