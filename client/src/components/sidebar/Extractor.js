const Class = (classes, classStr) => {
	let returnClassList = "";
	classStr.trim().split(" ").forEach((singleClass) => {
		returnClassList += classes[singleClass] + " ";
	});	
	return returnClassList;
}

export default Class;