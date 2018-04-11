import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { set } from '@ember/object';

export default Component.extend({

    findPostsTask: task(function * () {
        yield timeout(3000); // Testing: Added so we have time to cancel
        console.log('starting `findPostsTask`');
        return set(this, 'posts', yield fetch(`http://localhost:3000/posts?_delay=4000`).then(response => {
            return response.json();
        }));
    }),

    init() {
        this._super(...arguments);
        this.set('posts', this.get('findPostsTask').perform());
    },

    didDestroyElement() {
        this.get('findPostsTask').cancelAll();
    }
});
