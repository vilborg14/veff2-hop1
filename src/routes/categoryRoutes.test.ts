import { describe, it } from "@jest/globals";
import app from "../index.js";

describe('Category routes', () => {
    it('GET /categories - Returns all users', async () => {
        const res = await app.request('/categories', {
            method: 'GET'
        })
        return res;
    })
})

describe('Category routes', () => {
    it('DELETE /users - Returns all users', async () => {
        const res = await app.request('/categories/:id', {
            method: 'DELETE'
        })
        return res;
    })
})