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
(0, node_test_1.describe)('StudyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PEPTIDE_LIBRARY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PEPTIDE_LIBRARY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PeptideLibrarySDK.test();
        const ent = testsdk.Study();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('study hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.PeptideLibrarySDK.test(offline).Study().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.PeptideLibrarySDK.test(offline).Study()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.PeptideLibrarySDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Study().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.PeptideLibrarySDK.test().Study().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.PeptideLibrarySDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Study().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Study().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.PeptideLibrarySDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Study().list({ "cursor": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.PEPTIDE_LIBRARY_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'study.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "analog_compound": { "a": true, "h": "Analog Compound", "n": "analog_compound", "r": true, "sh": "Research on a related compound, not this one.", "t": "`$BOOLEAN`", "key$": "analog_compound", "index$": 0 }, "authors": { "a": true, "h": "Authors", "n": "authors", "r": true, "sh": "Not stored by Peptide Library.", "t": "`$STRING`", "key$": "authors", "index$": 1 }, "citations": { "a": true, "h": "Citations", "n": "citations", "r": true, "t": "`$ARRAY`", "union": { "branches": 2, "count": 3, "depth": 3 }, "key$": "citations", "index$": 2 }, "cited_by": { "a": true, "h": "Cited By", "n": "cited_by", "r": true, "t": "`$ARRAY`", "key$": "cited_by", "index$": 3 }, "doi": { "a": true, "h": "Doi", "n": "doi", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "doi", "index$": 4 }, "evidence_classification": { "a": true, "h": "Evidence Classification", "n": "evidence_classification", "r": true, "t": "`$STRING`", "key$": "evidence_classification", "index$": 5 }, "evidence_classification_label": { "a": true, "h": "Evidence Classification Label", "n": "evidence_classification_label", "r": true, "t": "`$STRING`", "key$": "evidence_classification_label", "index$": 6 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Stable id from the study's identifier (`pmid-…`, `doi-…`, `nct-…`); null when it has none.", "t": "`$STRING`", "key$": "id", "index$": 7 }, "journal": { "a": true, "h": "Journal", "n": "journal", "r": true, "sh": "Not stored by Peptide Library.", "t": "`$STRING`", "key$": "journal", "index$": 8 }, "limitations": { "a": true, "h": "Limitations", "n": "limitations", "r": true, "t": "`$ARRAY`", "key$": "limitations", "index$": 9 }, "nct_id": { "a": true, "h": "Nct Id", "n": "nct_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "nct_id", "index$": 10 }, "pmid": { "a": true, "h": "Pmid", "n": "pmid", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "pmid", "index$": 11 }, "population": { "a": true, "h": "Population", "n": "population", "r": true, "t": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "population", "index$": 12 }, "publication_year": { "a": true, "h": "Publication Year", "n": "publication_year", "r": true, "t": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "publication_year", "index$": 13 }, "research_model": { "a": true, "h": "Research Model", "n": "research_model", "r": true, "t": "`$STRING`", "key$": "research_model", "index$": 14 }, "sample_size": { "a": true, "h": "Sample Size", "n": "sample_size", "r": true, "t": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "sample_size", "index$": 15 }, "source_url": { "a": true, "h": "Source Url", "n": "source_url", "r": true, "t": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "source_url", "index$": 16 }, "study_type": { "a": true, "h": "Study Type", "n": "study_type", "r": true, "t": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "study_type", "index$": 17 }, "summary": { "a": true, "h": "Summary", "n": "summary", "r": true, "sh": "The finding as summarised by Peptide Library editors (dose figures removed).", "t": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "summary", "index$": 18 }, "title": { "a": true, "h": "Title", "n": "title", "r": true, "t": "`$STRING`", "key$": "title", "index$": 19 } }, "id": { "field": "id", "name": "id" }, "name": "study", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /peptides/{slug}/studies", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "bpc-157", "k": "param", "n": "slug", "or": "slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/peptides/{slug}/studies", "q": { "exist": ["slug"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "peptides" }, { "var": "slug" }, { "lit": "studies" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /studies", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "human_controlled_trial", "k": "query", "n": "evidence_classification", "or": "evidence_classification", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "id,title,publication_year", "k": "query", "n": "field", "or": "fields", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "ex": "semaglutide", "k": "query", "n": "peptide", "or": "peptide", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 6 }, { "a": true, "k": "query", "n": "year_from", "or": "year_from", "r": false, "t": "`$INTEGER`", "index$": 7 }, { "a": true, "k": "query", "n": "year_to", "or": "year_to", "r": false, "t": "`$INTEGER`", "index$": 8 }] }, "k": "http", "m": "GET", "o": "/studies", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "studies" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /studies/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "pmid-33567185", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/studies/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "studies" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "study", "name__orig": "study", "Name": "Study", "name_": "study", "name-": "study", "NAME": "STUDY", "index$": 6 }, { "active": true, "entity": "study", "key$": "BasicStudyFlow", "kind": "basic", "name": "BasicStudyFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "study_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "study_ref01", "srcdatavar": "study_ref01_data", "suffix": "_dt0" }, "m": { "id": "study01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-study_ref01" } }], "index$": 1, "route": "GET /studies/{id}", "record": {} }] }, 'Study', { "GET /peptides/{slug}/studies": { "protocol": "http", "parameters": [{ "name": "slug", "in": "path", "required": true, "description": "Peptide id (e.g. `bpc-157`), name, synonym or alias. Aliases resolve to the canonical profile.", "schema": { "type": "string" }, "example": "bpc-157", "index$": 0 }] }, "GET /studies": { "protocol": "http", "parameters": [{ "name": "peptide", "in": "query", "required": false, "description": "Only studies cited by this peptide (id, name or alias).", "schema": { "type": "string" }, "example": "semaglutide", "index$": 0 }, { "name": "evidence_classification", "in": "query", "required": false, "description": "Comma-separated classifications.", "schema": { "type": "string" }, "example": "human_controlled_trial", "index$": 1 }, { "name": "year_from", "in": "query", "required": false, "description": "Earliest publication year.", "schema": { "type": "integer", "minimum": 1900, "maximum": 2100 }, "index$": 2 }, { "name": "year_to", "in": "query", "required": false, "description": "Latest publication year.", "schema": { "type": "integer", "minimum": 1900, "maximum": 2100 }, "index$": 3 }, { "name": "search", "in": "query", "required": false, "description": "Words in the title.", "schema": { "type": "string", "maxLength": 200 }, "index$": 4 }, { "name": "sort", "in": "query", "required": false, "description": "`newest` (default), `oldest` or `title`.", "schema": { "type": "string", "enum": ["newest", "oldest", "title"] }, "index$": 5 }, { "name": "limit", "in": "query", "required": false, "description": "Results per page (1-100, default 20).", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "index$": 6 }, { "name": "cursor", "in": "query", "required": false, "description": "Opaque cursor from `pagination.next_cursor` of the previous page.", "schema": { "type": "string" }, "index$": 7 }, { "name": "fields", "in": "query", "required": false, "description": "Comma-separated fields to return for each item (`id` is always included). One of: id, title, publication_year, authors, journal, doi, pmid, nct_id, study_type, research_model, evidence_classification, evidence_classification_label, source_url, cited_by.", "schema": { "type": "string" }, "example": "id,title,publication_year", "index$": 8 }] }, "GET /studies/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Study id from /v1/studies.", "schema": { "type": "string" }, "example": "pmid-33567185", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let study_ref01_data = Object.values(setup.data.existing.study)[0];
        // LIST
        const study_ref01_ent = client.Study();
        const study_ref01_match = {};
        const study_ref01_list = (await study_ref01_ent.list(study_ref01_match)).map((e) => e.data());
        // LOAD
        const study_ref01_match_dt0 = {};
        study_ref01_match_dt0.id = study_ref01_data.id;
        const study_ref01_data_dt0 = (await study_ref01_ent.load(study_ref01_match_dt0)).data();
        (0, node_assert_1.default)(study_ref01_data_dt0.id === study_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/study/StudyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PeptideLibrarySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['study01', 'study02', 'study03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'PEPTIDE_LIBRARY_TEST_STUDY_ENTID': idmap,
        'PEPTIDE_LIBRARY_TEST_LIVE': 'FALSE',
        'PEPTIDE_LIBRARY_TEST_EXPLAIN': 'FALSE',
        'PEPTIDE_LIBRARY_APIKEY': '',
    });
    idmap = env['PEPTIDE_LIBRARY_TEST_STUDY_ENTID'];
    const live = 'TRUE' === env.PEPTIDE_LIBRARY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['PEPTIDE_LIBRARY_TEST_STUDY_ENTID'];
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
//# sourceMappingURL=StudyEntity.test.js.map