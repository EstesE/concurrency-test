import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { get, set } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Component.extend({

    findPostsTask: task(function * () {
        return set(this, 'posts', yield fetch(`http://localhost:3000/posts?_delay=4000`).then(response => {
            return response.json();
        }));
    }),

    init() {
        let component = this;
        component._super(...arguments);
        this.set('posts', this.get('findPostsTask').perform());
    },

    didReceiveAttrs(query) {
        if (isPresent(query)) {
            // TODO: Wire this up
            get(this, 'findPostsTask').perform(query);
        }
    }
});
