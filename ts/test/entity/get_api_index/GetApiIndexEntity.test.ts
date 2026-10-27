

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


describe('GetApiIndexEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PEPTIDE_LIBRARY_TEST_LIVE=TRUE.
  afterEach(liveDelay('PEPTIDE_LIBRARY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PeptideLibrarySDK.test()
    const ent = testsdk.GetApiIndex()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = PeptideLibrarySDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.GetApiIndex().load({"documentation":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PEPTIDE_LIBRARY_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_api_index.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"documentation":{"a":true,"h":"Documentation","n":"documentation","r":true,"sh":"Absolute URL.","t":"`$STRING`","key$":"documentation","index$":0},"endpoints":{"a":true,"h":"Endpoints","n":"endpoints","r":true,"t":"`$ARRAY`","key$":"endpoints","index$":1},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":2},"openapi":{"a":true,"h":"Openapi","n":"openapi","r":true,"sh":"Absolute URL.","t":"`$STRING`","key$":"openapi","index$":3},"release":{"a":true,"h":"Release","n":"release","r":true,"t":"`$STRING`","key$":"release","index$":4},"version":{"a":true,"h":"Version","n":"version","r":true,"t":"`$STRING`","key$":"version","index$":5}},"name":"get_api_index","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_api_index","name__orig":"get_api_index","Name":"GetApiIndex","name_":"get_api_index","name-":"get-api-index","NAME":"GET_API_INDEX","index$":0}, {"active":true,"entity":"get_api_index","key$":"BasicGetApiIndexFlow","kind":"basic","name":"BasicGetApiIndexFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"get_api_index_ref01","srcdatavar":"get_api_index_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_api_index_ref01"}}],"index$":0}]}, 'GetApiIndex', {"GET /":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_api_index_ref01_data = Object.values(setup.data.existing.get_api_index)[0] as any

    // LOAD
    const get_api_index_ref01_ent = client.GetApiIndex()
    const get_api_index_ref01_match_dt0: any = {}
    const get_api_index_ref01_data_dt0 = (await get_api_index_ref01_ent.load(get_api_index_ref01_match_dt0)).data()
    assert(null != get_api_index_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/get_api_index/GetApiIndexTestData.json')

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
    ['get_api_index01','get_api_index02','get_api_index03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PEPTIDE_LIBRARY_TEST_GET_API_INDEX_ENTID': idmap,
    'PEPTIDE_LIBRARY_TEST_LIVE': 'FALSE',
    'PEPTIDE_LIBRARY_TEST_EXPLAIN': 'FALSE',
    'PEPTIDE_LIBRARY_APIKEY': '',
  })

  idmap = env['PEPTIDE_LIBRARY_TEST_GET_API_INDEX_ENTID']

  const live = 'TRUE' === env.PEPTIDE_LIBRARY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PEPTIDE_LIBRARY_TEST_GET_API_INDEX_ENTID']
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
  
