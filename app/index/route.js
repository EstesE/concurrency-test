import Route from '@ember/routing/route';
import { task, timeout, waitForProperty } from 'ember-concurrency';
import { isPresent } from '@ember/utils';

export default Route.extend({
    posts: null,
    post: null,

    randomItem: function (items) {
        if (isPresent(items)) {
            return items[Math.floor(Math.random() * items.length)];
        }
    },

    model() {
        return {
            posts: this.get('findPostsTask').perform(),
            post: this.get('findPostTask').perform()
        }
    },

    findPostsTask: task(function * () {
        yield timeout(3000); // Testing: Added so we have time to cancel
        console.log('starting `findPostsTask in route`');
        return yield fetch(`http://localhost:3000/posts`).then(response => {
            return response.json();
        });
    }),

    findPostTask: task(function * () {
        yield waitForProperty(this, 'findPostsTask.isIdle');
        return this.randomItem(this.get('findPostsTask.last.value'));
    }),

    deactivate() {
        this.get('findPostsTask').cancelAll();
    }
});
