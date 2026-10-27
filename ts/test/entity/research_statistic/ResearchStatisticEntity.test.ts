

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


describe('ResearchStatisticEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PEPTIDE_LIBRARY_TEST_LIVE=TRUE.
  afterEach(liveDelay('PEPTIDE_LIBRARY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PeptideLibrarySDK.test()
    const ent = testsdk.ResearchStatistic()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('research_statistic hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of PeptideLibrarySDK.test(offline).ResearchStatistic().stream('list')) { }
    }, /offline/)

    for await (const _item of PeptideLibrarySDK.test(offline).ResearchStatistic()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = PeptideLibrarySDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ResearchStatistic().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of PeptideLibrarySDK.test().ResearchStatistic().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new PeptideLibrarySDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ResearchStatistic().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ResearchStatistic().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = PeptideLibrarySDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ResearchStatistic().list({"version":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PEPTIDE_LIBRARY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'research_statistic.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"by_year":{"a":true,"h":"By Year","n":"by_year","r":true,"t":"`$ARRAY`","key$":"by_year","index$":0},"categories":{"a":true,"h":"Categories","n":"categories","r":true,"t":"`$ARRAY`","key$":"categories","index$":1},"chart_url":{"a":true,"h":"Chart Url","n":"chart_url","r":true,"t":"`$ANY`","key$":"chart_url","index$":2},"citation":{"a":true,"h":"Citation","n":"citation","r":true,"t":"`$STRING`","key$":"citation","index$":3},"columns":{"a":true,"h":"Columns","n":"columns","r":true,"t":"`$ARRAY`","key$":"columns","index$":4},"definition":{"a":true,"h":"Definition","n":"definition","r":true,"t":"`$STRING`","key$":"definition","index$":5},"denominator":{"a":true,"h":"Denominator","n":"denominator","r":true,"t":["`$ONE`",["`$NUMBER`","`$NULL`"]],"key$":"denominator","index$":6},"denominator_definition":{"a":true,"h":"Denominator Definition","n":"denominator_definition","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"denominator_definition","index$":7},"description":{"a":true,"h":"Description","n":"description","r":true,"t":"`$STRING`","key$":"description","index$":8},"detail":{"a":true,"h":"Detail","n":"detail","r":true,"sh":"Rankings (array of rows) or comparison detail (object); null when none.","t":"`$ANY`","key$":"detail","index$":9},"doi":{"a":true,"h":"Doi","n":"doi","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"doi","index$":10},"doi_url":{"a":true,"h":"Doi Url","n":"doi_url","r":true,"t":"`$ANY`","key$":"doi_url","index$":11},"embed_url":{"a":true,"h":"Embed Url","n":"embed_url","r":true,"sh":"Absolute URL.","t":"`$STRING`","key$":"embed_url","index$":12},"evidence_class":{"a":true,"h":"Evidence Class","n":"evidence_class","r":true,"t":"`$STRING`","key$":"evidence_class","index$":13},"filters":{"a":true,"h":"Filters","n":"filters","r":true,"t":"`$OBJECT`","union":{"branches":4,"count":1,"depth":1},"key$":"filters","index$":14},"first_pub_date":{"a":true,"h":"First Pub Date","n":"first_pub_date","r":true,"t":"`$STRING`","key$":"first_pub_date","index$":15},"flags":{"a":true,"h":"Flags","n":"flags","r":true,"sh":"Caveats: partial_year, small_baseline, high_unclassified, whole_months_only, no_denominator.","t":"`$ARRAY`","key$":"flags","index$":16},"groups":{"a":true,"h":"Groups","n":"groups","r":true,"t":"`$ARRAY`","key$":"groups","index$":17},"how_to_read":{"a":true,"h":"How To Read","n":"how_to_read","r":true,"t":"`$STRING`","key$":"how_to_read","index$":18},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"`pmid-` + the PubMed id.","t":"`$STRING`","key$":"id","index$":19},"is_peptide":{"a":true,"h":"Is Peptide","n":"is_peptide","r":true,"t":"`$BOOLEAN`","key$":"is_peptide","index$":20},"journal":{"a":true,"h":"Journal","n":"journal","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"journal","index$":21},"key_publications":{"a":true,"h":"Key Publications","n":"key_publications","r":true,"t":"`$ARRAY`","key$":"key_publications","index$":22},"kind":{"a":true,"h":"Kind","n":"kind","r":true,"t":"`$STRING`","key$":"kind","index$":23},"label":{"a":true,"h":"Label","n":"label","r":true,"t":"`$STRING`","key$":"label","index$":24},"license":{"a":true,"h":"License","n":"license","r":true,"t":"`$OBJECT`","key$":"license","index$":25},"limitations":{"a":true,"h":"Limitations","n":"limitations","r":true,"t":"`$ARRAY`","key$":"limitations","index$":26},"mesh_roots":{"a":true,"h":"Mesh Roots","n":"mesh_roots","r":true,"t":"`$ARRAY`","key$":"mesh_roots","index$":27},"methodology_url":{"a":true,"h":"Methodology Url","n":"methodology_url","r":true,"sh":"Absolute URL.","t":"`$STRING`","key$":"methodology_url","index$":28},"metric":{"a":true,"h":"Metric","n":"metric","r":true,"t":"`$STRING`","key$":"metric","index$":29},"min_baseline":{"a":true,"h":"Min Baseline","n":"min_baseline","r":true,"t":"`$ANY`","key$":"min_baseline","index$":30},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":31},"numerator":{"a":true,"h":"Numerator","n":"numerator","r":true,"t":["`$ONE`",["`$NUMBER`","`$NULL`"]],"key$":"numerator","index$":32},"numerator_definition":{"a":true,"h":"Numerator Definition","n":"numerator_definition","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"numerator_definition","index$":33},"open_access":{"a":true,"h":"Open Access","n":"open_access","r":true,"t":["`$ONE`",["`$BOOLEAN`","`$NULL`"]],"key$":"open_access","index$":34},"origin":{"a":true,"h":"Origin","n":"origin","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"origin","index$":35},"partial_year":{"a":true,"h":"Partial Year","n":"partial_year","r":true,"sh":"The cutoff year, which is incomplete.","t":"`$INTEGER`","key$":"partial_year","index$":36},"peptide":{"a":true,"h":"Peptide","n":"peptide","r":true,"t":"`$OBJECT`","key$":"peptide","index$":37},"peptide_ids":{"a":true,"h":"Peptide Ids","n":"peptide_ids","r":true,"t":"`$ARRAY`","key$":"peptide_ids","index$":38},"permalink":{"a":true,"h":"Permalink","n":"permalink","r":true,"sh":"Absolute URL.","t":"`$STRING`","key$":"permalink","index$":39},"pmid":{"a":true,"h":"Pmid","n":"pmid","r":true,"t":"`$STRING`","key$":"pmid","index$":40},"png_url":{"a":true,"h":"Png Url","n":"png_url","r":true,"sh":"Absolute URL.","t":"`$STRING`","key$":"png_url","index$":41},"publications":{"a":true,"h":"Publications","n":"publications","r":true,"t":"`$ANY`","key$":"publications","index$":42},"published_at":{"a":true,"h":"Published At","n":"published_at","r":true,"t":"`$STRING`","key$":"published_at","index$":43},"pubmed_url":{"a":true,"h":"Pubmed Url","n":"pubmed_url","r":true,"sh":"Absolute URL.","t":"`$STRING`","key$":"pubmed_url","index$":44},"query":{"a":true,"h":"Query","n":"query","r":true,"sh":"The exact Europe PMC query behind the counts.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"query","index$":45},"regulatory":{"a":true,"h":"Regulatory","n":"regulatory","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"regulatory","index$":46},"research_url":{"a":true,"h":"Research Url","n":"research_url","r":true,"sh":"Absolute URL.","t":"`$STRING`","key$":"research_url","index$":47},"rows":{"a":true,"h":"Rows","n":"rows","r":true,"t":"`$ARRAY`","union":{"branches":4,"count":1,"depth":2},"key$":"rows","index$":48},"section":{"a":true,"h":"Section","n":"section","r":true,"sh":"State of Peptide Research section that uses it.","t":"`$INTEGER`","key$":"section","index$":49},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":50},"snapshot":{"a":true,"h":"Snapshot","n":"snapshot","r":true,"t":"`$OBJECT`","key$":"snapshot","index$":51},"source":{"a":true,"h":"Source","n":"source","r":true,"t":"`$STRING`","key$":"source","index$":52},"study_type":{"a":true,"h":"Study Type","n":"study_type","r":true,"t":"`$STRING`","key$":"study_type","index$":53},"study_types":{"a":true,"h":"Study Types","n":"study_types","r":true,"t":"`$ARRAY`","key$":"study_types","index$":54},"subtitle":{"a":true,"h":"Subtitle","n":"subtitle","r":true,"t":"`$STRING`","key$":"subtitle","index$":55},"svg_url":{"a":true,"h":"Svg Url","n":"svg_url","r":true,"sh":"Absolute URL.","t":"`$STRING`","key$":"svg_url","index$":56},"tier":{"a":true,"h":"Tier","n":"tier","r":true,"sh":"`counts_only`: yearly counts only (a very large, general literature); `excluded`: a blend or comparison entry.","t":"`$STRING`","key$":"tier","index$":57},"tier_reason":{"a":true,"h":"Tier Reason","n":"tier_reason","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"tier_reason","index$":58},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":59},"totals":{"a":true,"h":"Totals","n":"totals","r":true,"t":"`$ANY`","key$":"totals","index$":60},"trials":{"a":true,"h":"Trials","n":"trials","r":true,"t":"`$ANY`","key$":"trials","index$":61},"unit":{"a":true,"h":"Unit","n":"unit","r":true,"t":"`$STRING`","key$":"unit","index$":62},"url":{"a":true,"h":"Url","n":"url","r":true,"sh":"Absolute URL.","t":"`$STRING`","key$":"url","index$":63},"value":{"a":true,"h":"Value","n":"value","r":true,"t":["`$ONE`",["`$NUMBER`","`$NULL`"]],"key$":"value","index$":64},"version":{"a":true,"h":"Version","n":"version","r":true,"t":"`$INTEGER`","key$":"version","index$":65},"versions":{"a":true,"h":"Versions","n":"versions","r":true,"t":"`$ARRAY`","key$":"versions","index$":66}},"id":{"field":"id","name":"id"},"name":"research_statistic","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /research/categories","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"latest","k":"query","n":"version","or":"version","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/research/categories","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"research"},{"lit":"categories"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /research/datasets","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/research/datasets","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"research"},{"lit":"datasets"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1},{"a":true,"co":{"id":"GET /research/publications","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"category","or":"category","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"evidence_class","or":"evidence_class","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"id,pmid,doi","k":"query","n":"field","or":"fields","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"glp1","k":"query","n":"group","or":"group","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":25,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":5},{"a":true,"ex":"semaglutide","k":"query","n":"peptide","or":"peptide","r":false,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"regulatory","or":"regulatory","r":false,"t":"`$STRING`","index$":7},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":8},{"a":true,"k":"query","n":"study_type","or":"study_type","r":false,"t":"`$STRING`","index$":9},{"a":true,"ex":"latest","k":"query","n":"version","or":"version","r":false,"t":"`$STRING`","index$":10},{"a":true,"k":"query","n":"year","or":"year","r":false,"t":"`$INTEGER`","index$":11}]},"k":"http","m":"GET","o":"/research/publications","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"research"},{"lit":"publications"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":2},{"a":true,"co":{"id":"GET /research/reports","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/research/reports","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"research"},{"lit":"reports"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":3},{"a":true,"co":{"id":"GET /research/statistics","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"section","or":"section","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":"latest","k":"query","n":"version","or":"version","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/research/statistics","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"research"},{"lit":"statistics"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":4}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /research/charts/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"publications-by-year","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"latest","k":"query","n":"version","or":"version","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/research/charts/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"research"},{"lit":"charts"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /research/statistics/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"total_publications","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"latest","k":"query","n":"version","or":"version","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/research/statistics/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"research"},{"lit":"statistics"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1},{"a":true,"co":{"id":"GET /research/trends","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"category","or":"category","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"evidence_class","or":"evidence_class","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"from_year","or":"from_year","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":"glp1","k":"query","n":"group","or":"group","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"publications_by_year","k":"query","n":"metric","or":"metric","r":true,"t":"`$STRING`","index$":4},{"a":true,"ex":"semaglutide","k":"query","n":"peptide","or":"peptide","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"regulatory","or":"regulatory","r":false,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"study_type","or":"study_type","r":false,"t":"`$STRING`","index$":7},{"a":true,"k":"query","n":"to_year","or":"to_year","r":false,"t":"`$INTEGER`","index$":8},{"a":true,"ex":"latest","k":"query","n":"version","or":"version","r":false,"t":"`$STRING`","index$":9}]},"k":"http","m":"GET","o":"/research/trends","q":{"exist":["metric"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"research"},{"lit":"trends"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":2},{"a":true,"co":{"id":"GET /research/peptides/{slug}/statistics","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bpc-157","k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"latest","k":"query","n":"version","or":"version","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/research/peptides/{slug}/statistics","q":{"exist":["slug"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"research"},{"lit":"peptides"},{"var":"slug"},{"lit":"statistics"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":3}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"research_statistic","name__orig":"research_statistic","Name":"ResearchStatistic","name_":"research_statistic","name-":"research-statistic","NAME":"RESEARCH_STATISTIC","index$":5}, {"active":true,"entity":"research_statistic","key$":"BasicResearchStatisticFlow","kind":"basic","name":"BasicResearchStatisticFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"research_statistic_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"research_statistic_ref01","srcdatavar":"research_statistic_ref01_data","suffix":"_dt0"},"m":{"id":"research_statistic01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-research_statistic_ref01"}}],"index$":1,"route":"GET /research/charts/{id}","record":{}}]}, 'ResearchStatistic', {"GET /research/categories":{"protocol":"http","parameters":[{"name":"version","in":"query","required":false,"description":"Which snapshot: `latest` (default; the newest editorially approved edition), `live` (the automated weekly refresh) or a dataset version such as `2026.1`.","schema":{"type":"string","default":"latest"},"example":"latest","index$":0}]},"GET /research/datasets":{"protocol":"http","parameters":[]},"GET /research/publications":{"protocol":"http","parameters":[{"name":"peptide","in":"query","required":false,"description":"Only publications about this peptide (id, name or alias).","schema":{"type":"string"},"example":"semaglutide","index$":0},{"name":"group","in":"query","required":false,"description":"Only publications about a peptide in this compound group.","schema":{"type":"string","enum":["glp1","amylin","gh_axis","tissue_repair","cognitive_neuro","longevity_aging","bioregulators","thymic","melanocortin","cosmetic"]},"example":"glp1","index$":1},{"name":"category","in":"query","required":false,"description":"Only publications in this research category.","schema":{"type":"string","enum":["metabolic","obesity_weight","cognitive","neurological","longevity_aging","tissue_repair","musculoskeletal","cardiovascular","immune","dermatology","gastrointestinal","endocrinology","oncology","antimicrobial","reproductive_sexual"]},"index$":2},{"name":"evidence_class","in":"query","required":false,"description":"Only this evidence class.","schema":{"type":"string","enum":["human_clinical","secondary","animal","in_vitro","computational","other","unclassified"]},"index$":3},{"name":"study_type","in":"query","required":false,"description":"Only this study type.","schema":{"type":"string","enum":["rct","clinical_trial","observational","case_report","meta_analysis","systematic_review","review","animal","in_vitro","computational","guideline","other","notice","unclassified"]},"index$":4},{"name":"regulatory","in":"query","required":false,"description":"Only peptides with this regulatory label in the library.","schema":{"type":"string","enum":["FDA-Approved","Clinical Trial","Research-Only"]},"index$":5},{"name":"year","in":"query","required":false,"description":"First-publication year.","schema":{"type":"integer","minimum":1990,"maximum":2100},"index$":6},{"name":"search","in":"query","required":false,"description":"Words in the title.","schema":{"type":"string","maxLength":80},"index$":7},{"name":"version","in":"query","required":false,"description":"Which snapshot: `latest` (default; the newest editorially approved edition), `live` (the automated weekly refresh) or a dataset version such as `2026.1`.","schema":{"type":"string","default":"latest"},"example":"latest","index$":8},{"name":"limit","in":"query","required":false,"description":"Results per page (1-100, default 25).","schema":{"type":"integer","minimum":1,"maximum":100,"default":25},"index$":9},{"name":"cursor","in":"query","required":false,"description":"Opaque cursor from `pagination.next_cursor` of the previous page.","schema":{"type":"string"},"index$":10},{"name":"fields","in":"query","required":false,"description":"Comma-separated fields to return for each item (`id` is always included). One of: id, pmid, doi, title, journal, first_pub_date, study_type, evidence_class, categories, peptide_ids, open_access, pubmed_url, doi_url.","schema":{"type":"string"},"example":"id,pmid,doi","index$":11}]},"GET /research/reports":{"protocol":"http","parameters":[]},"GET /research/statistics":{"protocol":"http","parameters":[{"name":"version","in":"query","required":false,"description":"Which snapshot: `latest` (default; the newest editorially approved edition), `live` (the automated weekly refresh) or a dataset version such as `2026.1`.","schema":{"type":"string","default":"latest"},"example":"latest","index$":0},{"name":"section","in":"query","required":false,"description":"Only statistics used in this report section (1-10).","schema":{"type":"integer","minimum":1,"maximum":10},"index$":1},{"name":"limit","in":"query","required":false,"description":"Results per page (1-100, default 50).","schema":{"type":"integer","minimum":1,"maximum":100,"default":50},"index$":2},{"name":"cursor","in":"query","required":false,"description":"Opaque cursor from `pagination.next_cursor` of the previous page.","schema":{"type":"string"},"index$":3}]},"GET /research/charts/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"Chart id.","schema":{"type":"string","enum":["publications-by-year","publications-year-to-date","evidence-by-year","evidence-mix","most-researched-peptides","research-categories","glp1-publications-by-year","glp1-peptides","cognitive-peptides","longevity-peptides","trials-by-year","top-journals","open-access-by-year"]},"example":"publications-by-year","index$":0},{"name":"version","in":"query","required":false,"description":"Which snapshot: `latest` (default; the newest editorially approved edition), `live` (the automated weekly refresh) or a dataset version such as `2026.1`.","schema":{"type":"string","default":"latest"},"example":"latest","index$":1}]},"GET /research/statistics/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"Statistic id, e.g. `human_clinical_share`.","schema":{"type":"string","enum":["total_publications","compounds_indexed","compounds_with_publications","publications_ytd","growth_ytd","pubmed_growth_ytd","cagr_10y","pubmed_cagr_10y","human_clinical_share","preclinical_share","animal_share","in_vitro_share","secondary_share","unclassified_share","rct_publications","compounds_with_human_clinical_share","compounds_preclinical_only_share","trials_registered","trials_without_results_share","open_access_share","retracted_publications","ai_classified_share","top_compounds","top_research_only","fastest_growing_compounds","fastest_growing_categories","top_categories","evidence_gap","glp1_publications","glp1_share","glp1_growth_ytd","glp1_human_clinical_share","glp1_trials","cognitive_publications","cognitive_human_clinical_share","longevity_publications","longevity_human_clinical_share","top_journals"]},"example":"total_publications","index$":0},{"name":"version","in":"query","required":false,"description":"Which snapshot: `latest` (default; the newest editorially approved edition), `live` (the automated weekly refresh) or a dataset version such as `2026.1`.","schema":{"type":"string","default":"latest"},"example":"latest","index$":1}]},"GET /research/trends":{"protocol":"http","parameters":[{"name":"metric","in":"query","required":true,"description":"The series.","schema":{"type":"string","enum":["publications_by_year","ytd_by_year","evidence_by_year","evidence_mix","study_types","categories","categories_by_year","compounds","trials_by_year","trials_by_phase","trials_by_status","journals","countries","open_access_by_year","pubmed_by_year","counts_only"]},"example":"publications_by_year","index$":0},{"name":"peptide","in":"query","required":false,"description":"Only publications about this peptide (id, name or alias).","schema":{"type":"string"},"example":"semaglutide","index$":1},{"name":"group","in":"query","required":false,"description":"Only publications about a peptide in this compound group.","schema":{"type":"string","enum":["glp1","amylin","gh_axis","tissue_repair","cognitive_neuro","longevity_aging","bioregulators","thymic","melanocortin","cosmetic"]},"example":"glp1","index$":2},{"name":"category","in":"query","required":false,"description":"Only publications in this research category.","schema":{"type":"string","enum":["metabolic","obesity_weight","cognitive","neurological","longevity_aging","tissue_repair","musculoskeletal","cardiovascular","immune","dermatology","gastrointestinal","endocrinology","oncology","antimicrobial","reproductive_sexual"]},"index$":3},{"name":"evidence_class","in":"query","required":false,"description":"Only this evidence class.","schema":{"type":"string","enum":["human_clinical","secondary","animal","in_vitro","computational","other","unclassified"]},"index$":4},{"name":"study_type","in":"query","required":false,"description":"Only this study type.","schema":{"type":"string","enum":["rct","clinical_trial","observational","case_report","meta_analysis","systematic_review","review","animal","in_vitro","computational","guideline","other","notice","unclassified"]},"index$":5},{"name":"regulatory","in":"query","required":false,"description":"Only peptides with this regulatory label in the library.","schema":{"type":"string","enum":["FDA-Approved","Clinical Trial","Research-Only"]},"index$":6},{"name":"from_year","in":"query","required":false,"description":"First year (default: the window start).","schema":{"type":"integer","minimum":1990,"maximum":2100},"index$":7},{"name":"to_year","in":"query","required":false,"description":"Last year (default: the cutoff year).","schema":{"type":"integer","minimum":1990,"maximum":2100},"index$":8},{"name":"version","in":"query","required":false,"description":"Which snapshot: `latest` (default; the newest editorially approved edition), `live` (the automated weekly refresh) or a dataset version such as `2026.1`.","schema":{"type":"string","default":"latest"},"example":"latest","index$":9}]},"GET /research/peptides/{slug}/statistics":{"protocol":"http","parameters":[{"name":"slug","in":"path","required":true,"description":"Peptide id (e.g. `bpc-157`), name, synonym or alias. Aliases resolve to the canonical profile.","schema":{"type":"string"},"example":"bpc-157","index$":0},{"name":"version","in":"query","required":false,"description":"Which snapshot: `latest` (default; the newest editorially approved edition), `live` (the automated weekly refresh) or a dataset version such as `2026.1`.","schema":{"type":"string","default":"latest"},"example":"latest","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let research_statistic_ref01_data = Object.values(setup.data.existing.research_statistic)[0] as any

    // LIST
    const research_statistic_ref01_ent = client.ResearchStatistic()
    const research_statistic_ref01_match: any = {}

    const research_statistic_ref01_list = (await research_statistic_ref01_ent.list(research_statistic_ref01_match)).map((e: any) => e.data())


    // LOAD
    const research_statistic_ref01_match_dt0: any = {}
    research_statistic_ref01_match_dt0.id = research_statistic_ref01_data.id
    const research_statistic_ref01_data_dt0 = (await research_statistic_ref01_ent.load(research_statistic_ref01_match_dt0)).data()
    assert(research_statistic_ref01_data_dt0.id === research_statistic_ref01_data.id)


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
      '../../../../.sdk/test/entity/research_statistic/ResearchStatisticTestData.json')

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
    ['research_statistic01','research_statistic02','research_statistic03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PEPTIDE_LIBRARY_TEST_RESEARCH_STATISTIC_ENTID': idmap,
    'PEPTIDE_LIBRARY_TEST_LIVE': 'FALSE',
    'PEPTIDE_LIBRARY_TEST_EXPLAIN': 'FALSE',
    'PEPTIDE_LIBRARY_APIKEY': '',
  })

  idmap = env['PEPTIDE_LIBRARY_TEST_RESEARCH_STATISTIC_ENTID']

  const live = 'TRUE' === env.PEPTIDE_LIBRARY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PEPTIDE_LIBRARY_TEST_RESEARCH_STATISTIC_ENTID']
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
  
