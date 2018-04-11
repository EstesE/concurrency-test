import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { set } from '@ember/object';

export default Component.extend({

    findTagsTask: task(function * () {
        yield timeout(3000); // Testing: Added so we have time to cancel
        console.log('starting `findTagsTask`');
        return set(this, 'tags', yield fetch(`http://localhost:3000/tags?_delay=3000`).then(response => {
            return response.json();
        }));
    }),

    init() {
        this._super(...arguments);
        this.set('tags', this.get('findTagsTask').perform());
    },

    didDestroyElement() {
        this.get('findTagsTask').cancelAll();
    }
});
