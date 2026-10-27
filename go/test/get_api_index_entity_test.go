package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/peptide-library-sdk/go"
	"github.com/voxgig-sdk/peptide-library-sdk/go/core"

	vs "github.com/voxgig-sdk/peptide-library-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const get_api_indexEntityLiveStrict = true


func TestGetApiIndexEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GetApiIndex(nil)
		if ent == nil {
			t.Fatal("expected non-nil GetApiIndexEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.GetApiIndex(nil).Load(map[string]any{"documentation": 1}, nil)
		if sdkerr, ok := err.(*core.PeptideLibraryError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := get_api_indexBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "get_api_index." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		getApiIndexRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.get_api_index")))
		var getApiIndexRef01Data map[string]any
		if len(getApiIndexRef01DataRaw) > 0 {
			getApiIndexRef01Data = core.ToMapAny(getApiIndexRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = getApiIndexRef01Data

		// LOAD
		getApiIndexRef01Ent := client.GetApiIndex(nil)
		getApiIndexRef01MatchDt0 := map[string]any{}
		getApiIndexRef01DataDt0Loaded, err := getApiIndexRef01Ent.Load(getApiIndexRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if getApiIndexRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func get_api_indexBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "get_api_index", "GetApiIndexTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read get_api_index test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse get_api_index test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"get_api_index01", "get_api_index02", "get_api_index03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("PEPTIDE_LIBRARY_TEST_GET_API_INDEX_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"PEPTIDE_LIBRARY_TEST_GET_API_INDEX_ENTID": idmap,
		"PEPTIDE_LIBRARY_TEST_LIVE":      "FALSE",
		"PEPTIDE_LIBRARY_TEST_EXPLAIN":   "FALSE",
		"PEPTIDE_LIBRARY_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["PEPTIDE_LIBRARY_TEST_GET_API_INDEX_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["PEPTIDE_LIBRARY_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["PEPTIDE_LIBRARY_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewPeptideLibrarySDK(core.ToMapAny(mergedOpts))
	}

	live := env["PEPTIDE_LIBRARY_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["PEPTIDE_LIBRARY_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
