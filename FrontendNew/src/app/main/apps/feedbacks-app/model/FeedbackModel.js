function FeedbackModel(data) {
	const item = data || {};
	return {
		//id: item.id || FuseUtils.generateGUID(),
		comment: item.description || '',

		//archive: item.archive || false,
		//image: item.image || '',
		//time: item.time || null,
		//labels: item.labels || []
	};
}

export default FeedbackModel;
