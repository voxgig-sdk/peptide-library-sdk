"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('VendorEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PEPTIDE_LIBRARY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PEPTIDE_LIBRARY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PeptideLibrarySDK.test();
        const ent = testsdk.Vendor();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('vendor hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.PeptideLibrarySDK.test(offline).Vendor().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.PeptideLibrarySDK.test(offline).Vendor()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.PeptideLibrarySDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Vendor().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.PeptideLibrarySDK.test().Vendor().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.PeptideLibrarySDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Vendor().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Vendor().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.PeptideLibrarySDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Vendor().list({ "country": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.PEPTIDE_LIBRARY_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'vendor.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "about": { "a": true, "h": "About", "n": "about", "r": true, "t": "`$OBJECT`", "key$": "about", "index$": 0 }, "api_url": { "a": true, "h": "Api Url", "n": "api_url", "r": true, "sh": "Absolute URL.", "t": "`$STRING`", "key$": "api_url", "index$": 1 }, "catalog": { "a": true, "h": "Catalog", "n": "catalog", "r": true, "t": "`$OBJECT`", "key$": "catalog", "index$": 2 }, "country": { "a": true, "h": "Country", "n": "country", "r": true, "t": "`$ANY`", "key$": "country", "index$": 3 }, "description": { "a": true, "h": "Description", "n": "description", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "description", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Stable vendor id.", "t": "`$STRING`", "key$": "id", "index$": 5 }, "logo_url": { "a": true, "h": "Logo Url", "n": "logo_url", "r": true, "t": "`$ANY`", "key$": "logo_url", "index$": 6 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 7 }, "product_categories": { "a": true, "h": "Product Categories", "n": "product_categories", "r": true, "t": "`$ARRAY`", "key$": "product_categories", "index$": 8 }, "profile_url": { "a": true, "h": "Profile Url", "n": "profile_url", "r": true, "sh": "Absolute URL.", "t": "`$STRING`", "key$": "profile_url", "index$": 9 }, "rating": { "a": true, "h": "Rating", "n": "rating", "r": true, "t": "`$OBJECT`", "key$": "rating", "index$": 10 }, "region": { "a": true, "h": "Region", "n": "region", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "region", "index$": 11 }, "reviews": { "a": true, "h": "Reviews", "n": "reviews", "r": true, "t": "`$OBJECT`", "key$": "reviews", "index$": 12 }, "shipping": { "a": true, "h": "Shipping", "n": "shipping", "r": true, "t": "`$OBJECT`", "key$": "shipping", "index$": 13 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 14 }, "sources": { "a": true, "h": "Sources", "n": "sources", "r": true, "t": "`$OBJECT`", "key$": "sources", "index$": 15 }, "website_url": { "a": true, "h": "Website Url", "n": "website_url", "r": true, "sh": "Peptide Library link to the vendor's site (may be an affiliate link).", "t": "`$STRING`", "key$": "website_url", "index$": 16 } }, "id": { "field": "id", "name": "id" }, "name": "vendor", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /vendors/{id}/prices", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "8", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "peptides", "k": "query", "n": "category", "or": "category", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "USD", "k": "query", "n": "currency", "or": "currency", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "id,product_id,product_name", "k": "query", "n": "field", "or": "fields", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "vial", "k": "query", "n": "form", "or": "form", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "k": "query", "n": "in_stock", "or": "in_stock", "r": false, "t": "`$BOOLEAN`", "index$": 5 }, { "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 6 }, { "a": true, "ex": "bpc-157", "k": "query", "n": "peptide", "or": "peptide", "r": false, "t": "`$STRING`", "index$": 7 }, { "a": true, "k": "query", "n": "price_max", "or": "price_max", "r": false, "t": "`$NUMBER`", "index$": 8 }, { "a": true, "k": "query", "n": "price_min", "or": "price_min", "r": false, "t": "`$NUMBER`", "index$": 9 }, { "a": true, "k": "query", "n": "product", "or": "product", "r": false, "t": "`$STRING`", "index$": 10 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 11 }, { "a": true, "ex": "US", "k": "query", "n": "ships_to", "or": "ships_to", "r": false, "t": "`$STRING`", "index$": 12 }, { "a": true, "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 13 }, { "a": true, "k": "query", "n": "strength_max_mg", "or": "strength_max_mg", "r": false, "t": "`$NUMBER`", "index$": 14 }, { "a": true, "k": "query", "n": "strength_min_mg", "or": "strength_min_mg", "r": false, "t": "`$NUMBER`", "index$": 15 }] }, "k": "http", "m": "GET", "o": "/vendors/{id}/prices", "q": { "$action": "price", "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "vendors" }, { "var": "id" }, { "lit": "prices" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /vendors/{id}/products", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "8", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "peptides", "k": "query", "n": "category", "or": "category", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "id,peptide,form", "k": "query", "n": "field", "or": "fields", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "vial", "k": "query", "n": "form", "or": "form", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "in_stock", "or": "in_stock", "r": false, "t": "`$BOOLEAN`", "index$": 4 }, { "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 5 }, { "a": true, "ex": "bpc-157", "k": "query", "n": "peptide", "or": "peptide", "r": false, "t": "`$STRING`", "index$": 6 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 7 }, { "a": true, "ex": "US", "k": "query", "n": "ships_to", "or": "ships_to", "r": false, "t": "`$STRING`", "index$": 8 }, { "a": true, "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 9 }] }, "k": "http", "m": "GET", "o": "/vendors/{id}/products", "q": { "$action": "product", "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "vendors" }, { "var": "id" }, { "lit": "products" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /vendors", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "US", "k": "query", "n": "country", "or": "country", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "id,slug,name", "k": "query", "n": "field", "or": "fields", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "k": "query", "n": "min_rating", "or": "min_rating", "r": false, "t": "`$NUMBER`", "index$": 4 }, { "a": true, "k": "query", "n": "peptide", "or": "peptide", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "k": "query", "n": "product_category", "or": "product_category", "r": false, "t": "`$STRING`", "index$": 6 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 7 }, { "a": true, "ex": "US", "k": "query", "n": "ships_to", "or": "ships_to", "r": false, "t": "`$STRING`", "index$": 8 }, { "a": true, "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 9 }] }, "k": "http", "m": "GET", "o": "/vendors", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "vendors" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 2 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /vendors/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "8", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "US", "k": "query", "n": "ships_to", "or": "ships_to", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/vendors/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "vendors" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /vendors/compare", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "8,13", "k": "query", "n": "ids", "or": "ids", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "US", "k": "query", "n": "ships_to", "or": "ships_to", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/vendors/compare", "q": { "$action": "compare", "exist": ["ids"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "vendors" }, { "lit": "compare" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /vendors/{id}/shipping", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "8", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "US", "k": "query", "n": "ships_to", "or": "ships_to", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/vendors/{id}/shipping", "q": { "$action": "shipping", "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "vendors" }, { "var": "id" }, { "lit": "shipping" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 2 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "vendor", "name__orig": "vendor", "Name": "Vendor", "name_": "vendor", "name-": "vendor", "NAME": "VENDOR", "index$": 7 }, { "active": true, "entity": "vendor", "key$": "BasicVendorFlow", "kind": "basic", "name": "BasicVendorFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "vendor_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "vendor_ref01", "srcdatavar": "vendor_ref01_data", "suffix": "_dt0" }, "m": { "id": "vendor01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-vendor_ref01" } }], "index$": 1, "route": "GET /vendors/{id}", "record": {} }] }, 'Vendor', { "GET /vendors/{id}/prices": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Vendor id (stable) or the vendor's slug.", "schema": { "type": "string" }, "example": "8", "index$": 0 }, { "name": "search", "in": "query", "required": false, "description": "Product or compound name.", "schema": { "type": "string", "maxLength": 200 }, "index$": 1 }, { "name": "peptide", "in": "query", "required": false, "description": "Peptide id, name or alias.", "schema": { "type": "string" }, "example": "bpc-157", "index$": 2 }, { "name": "category", "in": "query", "required": false, "description": "Comma-separated product types.", "schema": { "type": "string" }, "example": "peptides", "index$": 3 }, { "name": "form", "in": "query", "required": false, "description": "Comma-separated forms: vial, solution, pen, nasal_spray, oral_spray, spray, capsule, tablet, topical, liquid, bulk_powder, other, unknown.", "schema": { "type": "string" }, "example": "vial", "index$": 4 }, { "name": "ships_to", "in": "query", "required": false, "description": "Shipping destination: ISO 3166-1 alpha-2 country (\"US\") or subdivision (\"US-CA\"). Adds `ships_to` to each result; `unknown` is never treated as ships.", "schema": { "type": "string", "pattern": "^[A-Za-z]{2}(-[A-Za-z0-9]{1,3})?$" }, "example": "US", "index$": 5 }, { "name": "in_stock", "in": "query", "required": false, "description": "Only in-stock offers.", "schema": { "type": "boolean" }, "index$": 6 }, { "name": "product", "in": "query", "required": false, "description": "Comma-separated product ids (`<peptide>::<form>`).", "schema": { "type": "string" }, "index$": 7 }, { "name": "currency", "in": "query", "required": false, "description": "ISO 4217 currency of the listed price.", "schema": { "type": "string", "pattern": "^[A-Za-z]{3}$" }, "example": "USD", "index$": 8 }, { "name": "price_min", "in": "query", "required": false, "description": "Minimum listed price.", "schema": { "type": "number", "minimum": 0 }, "index$": 9 }, { "name": "price_max", "in": "query", "required": false, "description": "Maximum listed price.", "schema": { "type": "number", "minimum": 0 }, "index$": 10 }, { "name": "strength_min_mg", "in": "query", "required": false, "description": "Minimum listed strength in mg.", "schema": { "type": "number", "minimum": 0 }, "index$": 11 }, { "name": "strength_max_mg", "in": "query", "required": false, "description": "Maximum listed strength in mg.", "schema": { "type": "number", "minimum": 0 }, "index$": 12 }, { "name": "sort", "in": "query", "required": false, "description": "Order (default `price`).", "schema": { "type": "string", "enum": ["price", "-price", "price_per_mg", "updated", "newest", "vendor"] }, "index$": 13 }, { "name": "limit", "in": "query", "required": false, "description": "Results per page (1-100, default 20).", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "index$": 14 }, { "name": "cursor", "in": "query", "required": false, "description": "Opaque cursor from `pagination.next_cursor` of the previous page.", "schema": { "type": "string" }, "index$": 15 }, { "name": "fields", "in": "query", "required": false, "description": "Comma-separated fields to return for each item (`id` is always included). One of: id, product_id, product_name, peptide, vendor, product_type, form, strength, price, regular_price, currency, price_per_mg, price_per_unit, availability, ships_to, last_seen_at, is_stale, first_seen_at, price_changed_at, product_page_url, is_affiliate_link.", "schema": { "type": "string" }, "example": "id,product_id,product_name", "index$": 16 }] }, "GET /vendors/{id}/products": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Vendor id (stable) or the vendor's slug.", "schema": { "type": "string" }, "example": "8", "index$": 0 }, { "name": "search", "in": "query", "required": false, "description": "Product or compound name.", "schema": { "type": "string", "maxLength": 200 }, "index$": 1 }, { "name": "peptide", "in": "query", "required": false, "description": "Peptide id, name or alias.", "schema": { "type": "string" }, "example": "bpc-157", "index$": 2 }, { "name": "category", "in": "query", "required": false, "description": "Comma-separated product types.", "schema": { "type": "string" }, "example": "peptides", "index$": 3 }, { "name": "form", "in": "query", "required": false, "description": "Comma-separated forms: vial, solution, pen, nasal_spray, oral_spray, spray, capsule, tablet, topical, liquid, bulk_powder, other, unknown.", "schema": { "type": "string" }, "example": "vial", "index$": 4 }, { "name": "ships_to", "in": "query", "required": false, "description": "Shipping destination: ISO 3166-1 alpha-2 country (\"US\") or subdivision (\"US-CA\"). Adds `ships_to` to each result; `unknown` is never treated as ships.", "schema": { "type": "string", "pattern": "^[A-Za-z]{2}(-[A-Za-z0-9]{1,3})?$" }, "example": "US", "index$": 5 }, { "name": "in_stock", "in": "query", "required": false, "description": "Only in-stock offers.", "schema": { "type": "boolean" }, "index$": 6 }, { "name": "sort", "in": "query", "required": false, "description": "Order (default `name`).", "schema": { "type": "string", "enum": ["name", "offers", "vendors"] }, "index$": 7 }, { "name": "limit", "in": "query", "required": false, "description": "Results per page (1-100, default 20).", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "index$": 8 }, { "name": "cursor", "in": "query", "required": false, "description": "Opaque cursor from `pagination.next_cursor` of the previous page.", "schema": { "type": "string" }, "index$": 9 }, { "name": "fields", "in": "query", "required": false, "description": "Comma-separated fields to return for each item (`id` is always included). One of: id, peptide, form, product_type, offer_count, vendor_count, in_stock_count, prices, last_seen_at, api_url.", "schema": { "type": "string" }, "example": "id,peptide,form", "index$": 10 }] }, "GET /vendors": { "protocol": "http", "parameters": [{ "name": "search", "in": "query", "required": false, "description": "Vendor name or alias.", "schema": { "type": "string", "maxLength": 200 }, "index$": 0 }, { "name": "country", "in": "query", "required": false, "description": "Where the vendor is based (ISO 3166-1 alpha-2).", "schema": { "type": "string", "pattern": "^[A-Za-z]{2}$" }, "example": "US", "index$": 1 }, { "name": "ships_to", "in": "query", "required": false, "description": "Only vendors that ship to this destination (country \"US\" or subdivision \"US-CA\"). Unknown coverage is left out.", "schema": { "type": "string", "pattern": "^[A-Za-z]{2}(-[A-Za-z0-9]{1,3})?$" }, "example": "US", "index$": 2 }, { "name": "product_category", "in": "query", "required": false, "description": "Only vendors with live listings of this product type.", "schema": { "type": "string", "enum": ["peptides", "sprays", "capsules", "other"] }, "index$": 3 }, { "name": "min_rating", "in": "query", "required": false, "description": "Minimum average rating (0-5).", "schema": { "type": "number", "minimum": 0, "maximum": 5 }, "index$": 4 }, { "name": "peptide", "in": "query", "required": false, "description": "Only vendors with live listings of this peptide (id, name or alias).", "schema": { "type": "string" }, "index$": 5 }, { "name": "sort", "in": "query", "required": false, "description": "Order (default `best_match`).", "schema": { "type": "string", "enum": ["best_match", "rating", "reviews", "popular", "products", "name", "-name"] }, "index$": 6 }, { "name": "limit", "in": "query", "required": false, "description": "Results per page (1-100, default 20).", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "index$": 7 }, { "name": "cursor", "in": "query", "required": false, "description": "Opaque cursor from `pagination.next_cursor` of the previous page.", "schema": { "type": "string" }, "index$": 8 }, { "name": "fields", "in": "query", "required": false, "description": "Comma-separated fields to return for each item (`id` is always included). One of: id, slug, name, description, logo_url, country, region, website_url, profile_url, product_categories, rating, catalog, shipping, api_url.", "schema": { "type": "string" }, "example": "id,slug,name", "index$": 9 }] }, "GET /vendors/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Vendor id (stable) or the vendor's slug.", "schema": { "type": "string" }, "example": "8", "index$": 0 }, { "name": "ships_to", "in": "query", "required": false, "description": "Shipping destination: ISO 3166-1 alpha-2 country (\"US\") or subdivision (\"US-CA\"). Adds `ships_to` to each result; `unknown` is never treated as ships.", "schema": { "type": "string", "pattern": "^[A-Za-z]{2}(-[A-Za-z0-9]{1,3})?$" }, "example": "US", "index$": 1 }] }, "GET /vendors/compare": { "protocol": "http", "parameters": [{ "name": "ids", "in": "query", "required": true, "description": "2-4 comma-separated vendor ids or slugs.", "schema": { "type": "string" }, "example": "8,13", "index$": 0 }, { "name": "ships_to", "in": "query", "required": false, "description": "Shipping destination: ISO 3166-1 alpha-2 country (\"US\") or subdivision (\"US-CA\"). Adds `ships_to` to each result; `unknown` is never treated as ships.", "schema": { "type": "string", "pattern": "^[A-Za-z]{2}(-[A-Za-z0-9]{1,3})?$" }, "example": "US", "index$": 1 }] }, "GET /vendors/{id}/shipping": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Vendor id (stable) or the vendor's slug.", "schema": { "type": "string" }, "example": "8", "index$": 0 }, { "name": "ships_to", "in": "query", "required": false, "description": "Shipping destination: ISO 3166-1 alpha-2 country (\"US\") or subdivision (\"US-CA\"). Adds `ships_to` to each result; `unknown` is never treated as ships.", "schema": { "type": "string", "pattern": "^[A-Za-z]{2}(-[A-Za-z0-9]{1,3})?$" }, "example": "US", "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let vendor_ref01_data = Object.values(setup.data.existing.vendor)[0];
        // LIST
        const vendor_ref01_ent = client.Vendor();
        const vendor_ref01_match = {};
        const vendor_ref01_list = (await vendor_ref01_ent.list(vendor_ref01_match)).map((e) => e.data());
        // LOAD
        const vendor_ref01_match_dt0 = {};
        vendor_ref01_match_dt0.id = vendor_ref01_data.id;
        const vendor_ref01_data_dt0 = (await vendor_ref01_ent.load(vendor_ref01_match_dt0)).data();
        (0, node_assert_1.default)(vendor_ref01_data_dt0.id === vendor_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/vendor/VendorTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PeptideLibrarySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['vendor01', 'vendor02', 'vendor03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'PEPTIDE_LIBRARY_TEST_VENDOR_ENTID': idmap,
        'PEPTIDE_LIBRARY_TEST_LIVE': 'FALSE',
        'PEPTIDE_LIBRARY_TEST_EXPLAIN': 'FALSE',
        'PEPTIDE_LIBRARY_APIKEY': '',
    });
    idmap = env['PEPTIDE_LIBRARY_TEST_VENDOR_ENTID'];
    const live = 'TRUE' === env.PEPTIDE_LIBRARY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['PEPTIDE_LIBRARY_TEST_VENDOR_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.PeptideLibrarySDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.PEPTIDE_LIBRARY_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.PEPTIDE_LIBRARY_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=VendorEntity.test.js.map