import FuseUtils from '@core/utils';

function NoteModel(data) {
	const item = data || {};
	return {
		id: item.id || FuseUtils.generateGUID(),
		title: item.title || '',
		description: item.description || '',
		archive: item.archive || false,
		image: item.image || '',
		time: item.time || null,
		reminder: item.reminder || null,
		checklist: item.checklist || [],
		labels: item.labels || []
	};
}

export default NoteModel;
