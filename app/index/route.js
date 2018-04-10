import Route from '@ember/routing/route';
import { task, waitForProperty } from 'ember-concurrency';

export default Route.extend({
    posts: null,
    post: null,

    randomItem: function (items) {
        return items[Math.floor(Math.random() * items.length)];
    },

    model() {
        return {
            posts: this.get('findPostsTask').perform(),
            post: this.get('findPostTask').perform()
        }
    },

    findPostsTask: task(function * () {
        return yield fetch(`http://localhost:3000/posts`).then(response => {
            return response.json();
        });
    }),

    findPostTask: task(function * () {
        yield waitForProperty(this, 'findPostsTask.isIdle');
        return this.randomItem(this.get('findPostsTask.last.value'));
    })
});
