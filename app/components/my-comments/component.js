import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { get, set } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Component.extend({

    findCommentsTask: task(function * () {
        return set(this, 'comments', yield fetch(`http://localhost:3000/comments?_delay=1000`).then(response => {
            return response.json();
        }));
    }),

    init() {
        let component = this;
        component._super(...arguments);
        this.set('comments', this.get('findCommentsTask').perform());
    },

    didReceiveAttrs(query) {
        if (isPresent(query)) {
            // TODO: Wire this up
            get(this, 'findCommentsTask').perform(query);
        }
    }
});
