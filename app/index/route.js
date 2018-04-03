import Route from '@ember/routing/route';
import { task } from 'ember-concurrency';

export default Route.extend({
    model() {
        return {
            properties: this.get('findPropertiesTask').perform(),
            states: this.get('findStatesTask').perform(),
            markets: this.get('findMarketsTask').perform()
        }
    },

    findPropertiesTask: task(function * () {
        return yield fetch('http://www.mocky.io/v2/5ac3eddb3000006600f47147?mocky-delay=6000ms').then(response => {
            return response.json();
        });
    }),

    findStatesTask: task(function * () {
        return yield fetch('http://www.mocky.io/v2/5ac3ed733000004900f47146?mocky-delay=2000ms').then(response => {
            return response.json();
        });
    }),

    findMarketsTask: task(function * () {
        return yield fetch('http://www.mocky.io/v2/5ac3ec5c3000005000f47145?mocky-delay=3000ms').then(response => {
            return response.json();
        });
    })
});
