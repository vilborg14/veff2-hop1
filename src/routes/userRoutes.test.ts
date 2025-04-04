import { describe, it } from "@jest/globals";
import app from "../index.js";

describe('User routes', () => {
    it('GET /users - Returns all users', async () => {
        const res = await app.request('/users', {
            method: 'GET'
        })
        return res;
    })
})

describe('User routes', () => {
    it('POST /users - Returns all users', async () => {
        const res = await app.request('/users/register', {
            method: 'POST'
        })
        return res;
    })
})