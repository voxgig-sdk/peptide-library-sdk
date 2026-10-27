

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { PeptideLibrarySDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ResearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PEPTIDE_LIBRARY_TEST_LIVE=TRUE.
  afterEach(liveDelay('PEPTIDE_LIBRARY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PeptideLibrarySDK.test()
    const ent = testsdk.Research()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('research hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of PeptideLibrarySDK.test(offline).Research().stream('list')) { }
    }, /offline/)

    for await (const _item of PeptideLibrarySDK.test(offline).Research()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = PeptideLibrarySDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Research().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of PeptideLibrarySDK.test().Research().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new PeptideLibrarySDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Research().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Research().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = PeptideLibrarySDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Research().list({"api_url":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PEPTIDE_LIBRARY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'research.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"also_known_as":{"a":true,"h":"Also Known As","n":"also_known_as","r":true,"t":"`$ARRAY`","key$":"also_known_as","index$":0},"api_url":{"a":true,"h":"Api Url","n":"api_url","r":true,"sh":"Absolute URL.","t":"`$STRING`","key$":"api_url","index$":1},"approved_medicine":{"a":true,"h":"Approved Medicine","n":"approved_medicine","r":true,"sh":"True only when the recorded FDA status is Approved.","t":"`$BOOLEAN`","key$":"approved_medicine","index$":2},"availability":{"a":true,"h":"Availability","n":"availability","r":true,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"availability","index$":3},"categories":{"a":true,"h":"Categories","n":"categories","r":true,"t":"`$ARRAY`","key$":"categories","index$":4},"classification":{"a":true,"h":"Classification","n":"classification","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":4,"depth":2},"key$":"classification","index$":5},"clinical_evidence":{"a":true,"h":"Clinical Evidence","n":"clinical_evidence","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":9,"depth":5},"key$":"clinical_evidence","index$":6},"conflict":{"a":true,"h":"Conflict","n":"conflict","r":true,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"conflict","index$":7},"content":{"a":true,"h":"Content","n":"content","r":true,"t":"`$ARRAY`","key$":"content","index$":8},"content_reviewed_at":{"a":true,"h":"Content Reviewed At","n":"content_reviewed_at","r":true,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"content_reviewed_at","index$":9},"content_total":{"a":true,"h":"Content Total","n":"content_total","r":true,"t":"`$INTEGER`","key$":"content_total","index$":10},"description":{"a":true,"h":"Description","n":"description","r":true,"t":"`$STRING`","key$":"description","index$":11},"development_stage":{"a":true,"h":"Development Stage","n":"development_stage","r":true,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"development_stage","index$":12},"evidence":{"a":true,"h":"Evidence","n":"evidence","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":16,"depth":5},"key$":"evidence","index$":13},"fda_status":{"a":true,"h":"Fda Status","n":"fda_status","r":true,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"fda_status","index$":14},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":15},"label":{"a":true,"h":"Label","n":"label","r":true,"t":"`$STRING`","key$":"label","index$":16},"last_reviewed":{"a":true,"h":"Last Reviewed","n":"last_reviewed","r":true,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"last_reviewed","index$":17},"library_classification":{"a":true,"h":"Library Classification","n":"library_classification","r":true,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"library_classification","index$":18},"limitations":{"a":true,"h":"Limitations","n":"limitations","r":true,"t":"`$ARRAY`","key$":"limitations","index$":19},"links":{"a":true,"h":"Links","n":"links","r":true,"t":"`$OBJECT`","key$":"links","index$":20},"mechanism":{"a":true,"h":"Mechanism","n":"mechanism","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":2,"depth":2},"key$":"mechanism","index$":21},"mechanisms":{"a":true,"h":"Mechanisms","n":"mechanisms","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":3,"depth":2},"key$":"mechanisms","index$":22},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":23},"note":{"a":true,"h":"Note","n":"note","r":true,"t":"`$STRING`","key$":"note","index$":24},"notes":{"a":true,"h":"Notes","n":"notes","r":true,"t":"`$ARRAY`","key$":"notes","index$":25},"peptide":{"a":true,"h":"Peptide","n":"peptide","r":true,"t":"`$OBJECT`","key$":"peptide","index$":26},"peptide_count":{"a":true,"h":"Peptide Count","n":"peptide_count","r":true,"t":"`$INTEGER`","key$":"peptide_count","index$":27},"peptide_total":{"a":true,"h":"Peptide Total","n":"peptide_total","r":true,"t":"`$INTEGER`","key$":"peptide_total","index$":28},"peptides":{"a":true,"h":"Peptides","n":"peptides","r":true,"t":"`$ARRAY`","union":{"branches":2,"count":6,"depth":5},"key$":"peptides","index$":29},"preclinical_evidence":{"a":true,"h":"Preclinical Evidence","n":"preclinical_evidence","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":7,"depth":5},"key$":"preclinical_evidence","index$":30},"properties":{"a":true,"h":"Properties","n":"properties","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":6,"depth":2},"key$":"properties","index$":31},"query":{"a":true,"h":"Query","n":"query","r":true,"t":"`$STRING`","key$":"query","index$":32},"references":{"a":true,"h":"References","n":"references","r":true,"t":"`$ARRAY`","key$":"references","index$":33},"regulatory":{"a":true,"h":"Regulatory","n":"regulatory","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":5,"depth":2},"key$":"regulatory","index$":34},"regulatory_evidence":{"a":true,"h":"Regulatory Evidence","n":"regulatory_evidence","r":true,"t":"`$ARRAY`","union":{"branches":2,"count":6,"depth":3},"key$":"regulatory_evidence","index$":35},"regulatory_status":{"a":true,"h":"Regulatory Status","n":"regulatory_status","r":true,"sh":"Regulatory class read from the profile's FDA status.","t":"`$STRING`","key$":"regulatory_status","index$":36},"regulatory_status_label":{"a":true,"h":"Regulatory Status Label","n":"regulatory_status_label","r":true,"t":"`$STRING`","key$":"regulatory_status_label","index$":37},"research_areas":{"a":true,"h":"Research Areas","n":"research_areas","r":true,"t":"`$ARRAY`","key$":"research_areas","index$":38},"research_gaps":{"a":true,"h":"Research Gaps","n":"research_gaps","r":true,"sh":"Evidence steps with no documented source in the profile.","t":"`$ARRAY`","key$":"research_gaps","index$":39},"research_topics":{"a":true,"h":"Research Topics","n":"research_topics","r":true,"t":"`$ARRAY`","key$":"research_topics","index$":40},"review":{"a":true,"h":"Review","n":"review","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":3,"depth":2},"key$":"review","index$":41},"safety":{"a":true,"h":"Safety","n":"safety","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":2},"key$":"safety","index$":42},"secondary_reports":{"a":true,"h":"Secondary Reports","n":"secondary_reports","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":7,"depth":5},"key$":"secondary_reports","index$":43},"statement":{"a":true,"h":"Statement","n":"statement","r":true,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"statement","index$":44},"summary":{"a":true,"h":"Summary","n":"summary","r":true,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"summary","index$":45},"unavailable_sources":{"a":true,"h":"Unavailable Sources","n":"unavailable_sources","r":true,"t":"`$ARRAY`","key$":"unavailable_sources","index$":46},"url":{"a":true,"h":"Url","n":"url","r":true,"sh":"Absolute URL.","t":"`$STRING`","key$":"url","index$":47},"wada_status":{"a":true,"h":"Wada Status","n":"wada_status","r":true,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"wada_status","index$":48}},"id":{"field":"id","name":"id"},"name":"research","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /categories","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/categories","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"categories"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /peptides","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"category","or":"category","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"evidence_level","or":"evidence_level","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"id,name,also_known_as","k":"query","n":"field","or":"fields","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"k":"query","n":"regulatory_status","or":"regulatory_status","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"research_area","or":"research_area","r":false,"t":"`$STRING`","index$":6},{"a":true,"ex":"bpc","k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":7},{"a":true,"k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":8}]},"k":"http","m":"GET","o":"/peptides","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"peptides"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1},{"a":true,"co":{"id":"GET /research-areas","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/research-areas","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"research-areas"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":2}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /search","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"glp-1","k":"query","n":"q","or":"q","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"type","or":"types","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/search","q":{"exist":["q"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /peptides/{slug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bpc-157","k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/peptides/{slug}","q":{"exist":["slug"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"peptides"},{"var":"slug"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1},{"a":true,"co":{"id":"GET /peptides/{slug}/research","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bpc-157","k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/peptides/{slug}/research","q":{"exist":["slug"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"peptides"},{"var":"slug"},{"lit":"research"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":2},{"a":true,"co":{"id":"GET /regulatory-status/{slug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bpc-157","k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/regulatory-status/{slug}","q":{"exist":["slug"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"regulatory-status"},{"var":"slug"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":3}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"research","name__orig":"research","Name":"Research","name_":"research","name-":"research","NAME":"RESEARCH","index$":4}, {"active":true,"entity":"research","key$":"BasicResearchFlow","kind":"basic","name":"BasicResearchFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"research_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"research_ref01","srcdatavar":"research_ref01_data","suffix":"_dt0"},"m":{"id":"research01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-research_ref01"}}],"index$":1}]}, 'Research', {"GET /categories":{"protocol":"http","parameters":[]},"GET /peptides":{"protocol":"http","parameters":[{"name":"search","in":"query","required":false,"description":"Name, synonym, alias or partial name.","schema":{"type":"string","maxLength":200},"example":"bpc","index$":0},{"name":"category","in":"query","required":false,"description":"Research category id (see /v1/categories).","schema":{"type":"string","enum":["fat-loss","cognitive","muscle-recovery","longevity","glp1-metabolic","cosmetic","experimental"]},"index$":1},{"name":"research_area","in":"query","required":false,"description":"Studied research area, e.g. \"tissue repair\" (see /v1/research-areas).","schema":{"type":"string","maxLength":80},"index$":2},{"name":"evidence_level","in":"query","required":false,"description":"Evidence level of reviewed profiles.","schema":{"type":"string","enum":["fda-approved","established-human","clinical-trial","limited-human","preclinical","insufficient"]},"index$":3},{"name":"regulatory_status","in":"query","required":false,"description":"Regulatory class from the recorded FDA status.","schema":{"type":"string","enum":["approved","investigational","experimental","withdrawn","insufficient"]},"index$":4},{"name":"sort","in":"query","required":false,"description":"Order: `relevance` (default with `search`), `name` (default), `-name`, `evidence`, `updated`.","schema":{"type":"string","enum":["relevance","name","-name","evidence","updated"]},"index$":5},{"name":"limit","in":"query","required":false,"description":"Results per page (1-100, default 20).","schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"index$":6},{"name":"cursor","in":"query","required":false,"description":"Opaque cursor from `pagination.next_cursor` of the previous page.","schema":{"type":"string"},"index$":7},{"name":"fields","in":"query","required":false,"description":"Comma-separated fields to return for each item (`id` is always included). One of: id, name, also_known_as, categories, summary, research_topics, classification, fda_status, evidence, url, regulatory_status, content_reviewed_at, api_url.","schema":{"type":"string"},"example":"id,name,also_known_as","index$":8}]},"GET /research-areas":{"protocol":"http","parameters":[{"name":"search","in":"query","required":false,"description":"Part of an area name.","schema":{"type":"string","maxLength":80},"index$":0},{"name":"limit","in":"query","required":false,"description":"Results per page (1-100, default 20).","schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"index$":1},{"name":"cursor","in":"query","required":false,"description":"Opaque cursor from `pagination.next_cursor` of the previous page.","schema":{"type":"string"},"index$":2}]},"GET /search":{"protocol":"http","parameters":[{"name":"q","in":"query","required":true,"description":"What to search for.","schema":{"type":"string","minLength":1,"maxLength":200},"example":"glp-1","index$":0},{"name":"types","in":"query","required":false,"description":"Comma-separated: `peptides`, `content` (default both).","schema":{"type":"string"},"index$":1},{"name":"limit","in":"query","required":false,"description":"Results per page (1-25, default 10).","schema":{"type":"integer","minimum":1,"maximum":25,"default":10},"index$":2}]},"GET /peptides/{slug}":{"protocol":"http","parameters":[{"name":"slug","in":"path","required":true,"description":"Peptide id (e.g. `bpc-157`), name, synonym or alias. Aliases resolve to the canonical profile.","schema":{"type":"string"},"example":"bpc-157","index$":0}]},"GET /peptides/{slug}/research":{"protocol":"http","parameters":[{"name":"slug","in":"path","required":true,"description":"Peptide id (e.g. `bpc-157`), name, synonym or alias. Aliases resolve to the canonical profile.","schema":{"type":"string"},"example":"bpc-157","index$":0}]},"GET /regulatory-status/{slug}":{"protocol":"http","parameters":[{"name":"slug","in":"path","required":true,"description":"Peptide id (e.g. `bpc-157`), name, synonym or alias. Aliases resolve to the canonical profile.","schema":{"type":"string"},"example":"bpc-157","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let research_ref01_data = Object.values(setup.data.existing.research)[0] as any

    // LIST
    const research_ref01_ent = client.Research()
    const research_ref01_match: any = {}

    const research_ref01_list = (await research_ref01_ent.list(research_ref01_match)).map((e: any) => e.data())


    // LOAD
    const research_ref01_match_dt0: any = {}
    research_ref01_match_dt0.id = research_ref01_data.id
    const research_ref01_data_dt0 = (await research_ref01_ent.load(research_ref01_match_dt0)).data()
    assert(research_ref01_data_dt0.id === research_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/research/ResearchTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = PeptideLibrarySDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['research01','research02','research03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PEPTIDE_LIBRARY_TEST_RESEARCH_ENTID': idmap,
    'PEPTIDE_LIBRARY_TEST_LIVE': 'FALSE',
    'PEPTIDE_LIBRARY_TEST_EXPLAIN': 'FALSE',
    'PEPTIDE_LIBRARY_APIKEY': '',
  })

  idmap = env['PEPTIDE_LIBRARY_TEST_RESEARCH_ENTID']

  const live = 'TRUE' === env.PEPTIDE_LIBRARY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PEPTIDE_LIBRARY_TEST_RESEARCH_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new PeptideLibrarySDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
