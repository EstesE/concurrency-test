import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { get, set } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Component.extend({

    findTagsTask: task(function * () {
        return set(this, 'tags', yield fetch(`http://localhost:3000/tags?_delay=3000`).then(response => {
            return response.json();
        }));
    }),

    init() {
        let component = this;
        component._super(...arguments);
        this.set('tags', this.get('findTagsTask').perform());
    },

    didReceiveAttrs(query) {
        if (isPresent(query)) {
            // TODO: Wire this up
            get(this, 'findTagsTask').perform(query);
        }
    }
});
