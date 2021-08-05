// 删除注释
function removeComment(str) {
	const reg =
		/("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n|$))|(\/\*(\n|.)*?\*\/)/g;

	return str.replace(reg, function (s) {
		return /^\/{2,}/.test(s) || /^\/\*/.test(s) ? '' : s;
	});
}
exports.removeComment = removeComment;
