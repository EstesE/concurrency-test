import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { set } from '@ember/object';

export default Component.extend({

    findCommentsTask: task(function * () {
        yield timeout(3000); // Testing: Added so we have time to cancel
        console.log('starting `findCommentsTask`');
        return set(this, 'comments', yield fetch(`http://localhost:3000/comments?_delay=1000`).then(response => {
            return response.json();
        }));
    }),

    init() {
        this._super(...arguments);
        this.set('comments', this.get('findCommentsTask').perform());
    },

    didDestroyElement() {
        this.get('findCommentsTask').cancelAll();
    }
});
