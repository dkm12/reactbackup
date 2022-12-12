import FuseUtils from '@core/utils';

class ListModel {
	constructor(data) {
		const list = data || {};

		this.id = list.id || FuseUtils.generateGUID();
		this.name = list.name || '';
		this.idCards = [];
	}
}

export default ListModel;
