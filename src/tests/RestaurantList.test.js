// tests/RestaurantList.test.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RestaurantList from '../components/Restaurantlist.vue'


describe('RestaurantList.vue', () => {
    it('zeigt eine Nachricht, wenn keine Restaurants vorhanden sind', () => {
        const wrapper = mount(RestaurantList, {
            props: { restaurants: [] }
        })

        expect(wrapper.text()).toContain('Aktuell gibt es leider keine Restaurants')
    })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RestaurantList from '../components/RestaurantList.vue'

describe('RestaurantList.vue', () => {
    it('zeigt eine Liste von Restaurants an', () => {
        const wrapper = mount(RestaurantList, {
            props: {
                restaurants: [
                    { id: 1, name: 'Pizza Napoli', address: 'Teststraße', businesshours: 'Geöffnet', category: 'Pizzeria' }
                ]
            }
        })

        expect(wrapper.text()).toContain('Pizza Napoli')
        expect(wrapper.text()).toContain('Teststraße')
    })
})


import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RestaurantList from '../components/RestaurantList.vue'

describe('RestaurantList.vue', () => {
    it('toggle zwischen allen Restaurants und Favoriten funktioniert', async () => {
        const wrapper = mount(RestaurantList, {
            props: {
                restaurants: [
                    { id: 1, name: 'Pizza Napoli' },
                    { id: 2, name: 'Sushi Haus' }
                ]
            }
        })

        // Vor dem Toggle: Beide Restaurants sichtbar
        expect(wrapper.text()).toContain('Pizza Napoli')
        expect(wrapper.text()).toContain('Sushi Haus')

        // Klicke den Toggle-Button (Frontend-only Test)
        const button = wrapper.find('button.filter-btn')
        await button.trigger('click')

        // Jetzt zeigt er nur Favoriten – es gibt aber keine → Kein Restaurant sichtbar
        expect(wrapper.text()).not.toContain('Pizza Napoli')
        expect(wrapper.text()).not.toContain('Sushi Haus')
    })
})

