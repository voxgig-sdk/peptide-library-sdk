<?php
declare(strict_types=1);

// PeptideLibrary SDK context

require_once __DIR__ . '/Control.php';
require_once __DIR__ . '/Operation.php';
require_once __DIR__ . '/Spec.php';
require_once __DIR__ . '/Result.php';
require_once __DIR__ . '/Response.php';
require_once __DIR__ . '/Error.php';
require_once __DIR__ . '/Helpers.php';

class PeptideLibraryContext implements \JsonSerializable
{
    public string $id;
    public array $out;
    public mixed $client;
    public ?PeptideLibraryUtility $utility;
    public PeptideLibraryControl $ctrl;
    public array $meta;
    public ?array $config;
    public ?array $entopts;
    public ?array $options;
    public mixed $entity;
    public ?array $shared;
    public array $opmap;
    public array $data;
    public array $reqdata;
    public array $match;
    public array $reqmatch;
    public ?array $point;
    public ?PeptideLibrarySpec $spec;
    public ?PeptideLibraryResult $result;
    public ?PeptideLibraryResponse $response;
    public PeptideLibraryOperation $op;
    // Set by make_error as it fires PreUnexpected, which fires once per
    // operation.
    public bool $unexpected_fired = false;

    public function __construct(array $ctxmap = [], ?self $basectx = null)
    {
        $this->id = 'C' . random_int(10000000, 99999999);
        $this->out = [];

        $this->client = PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'client') ?? ($basectx ? $basectx->client : null);
        $this->utility = PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'utility') ?? ($basectx ? $basectx->utility : null);

        $this->ctrl = new PeptideLibraryControl();
        $ctrl_raw = PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'ctrl');
        if (is_array($ctrl_raw)) {
            if (array_key_exists('throw', $ctrl_raw)) {
                $this->ctrl->throw_err = $ctrl_raw['throw'];
            }
            if (isset($ctrl_raw['explain']) && is_array($ctrl_raw['explain'])) {
                $this->ctrl->explain = $ctrl_raw['explain'];
            }
            if (array_key_exists('actor', $ctrl_raw)) {
                $this->ctrl->actor = $ctrl_raw['actor'];
            }
            if (isset($ctrl_raw['paging']) && is_array($ctrl_raw['paging'])) {
                $this->ctrl->paging = $ctrl_raw['paging'];
            }
        } elseif ($basectx !== null && $basectx->ctrl !== null
            && PeptideLibraryHelpers::get_ctx_prop($ctxmap, "opname") === null) {
            $this->ctrl = $basectx->ctrl;
        }

        $m = PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'meta');
        $this->meta = is_array($m) ? $m : ($basectx ? $basectx->meta ?? [] : []);

        $cfg = PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'config');
        $this->config = is_array($cfg) ? $cfg : ($basectx ? $basectx->config : null);

        $eo = PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'entopts');
        $this->entopts = is_array($eo) ? $eo : ($basectx ? $basectx->entopts : null);

        $o = PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'options');
        $this->options = is_array($o) ? $o : ($basectx ? $basectx->options : null);

        $e = PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'entity');
        $this->entity = $e ?? ($basectx ? $basectx->entity : null);

        $s = PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'shared');
        $this->shared = is_array($s) ? $s : ($basectx ? $basectx->shared : null);

        $om = PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'opmap');
        $this->opmap = is_array($om) ? $om : ($basectx ? $basectx->opmap ?? [] : []);

        $this->data = PeptideLibraryHelpers::to_map(PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'data')) ?? [];
        $this->reqdata = PeptideLibraryHelpers::to_map(PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'reqdata')) ?? [];
        $this->match = PeptideLibraryHelpers::to_map(PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'match')) ?? [];
        $this->reqmatch = PeptideLibraryHelpers::to_map(PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'reqmatch')) ?? [];

        $pt = PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'point');
        $this->point = is_array($pt) ? $pt : ($basectx ? $basectx->point : null);

        $sp = PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'spec');
        $this->spec = ($sp instanceof PeptideLibrarySpec) ? $sp : ($basectx ? $basectx->spec : null);

        $r = PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'result');
        $this->result = ($r instanceof PeptideLibraryResult) ? $r : ($basectx ? $basectx->result : null);

        $rp = PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'response');
        $this->response = ($rp instanceof PeptideLibraryResponse) ? $rp : ($basectx ? $basectx->response : null);

        $opname = PeptideLibraryHelpers::get_ctx_prop($ctxmap, 'opname') ?? '';
        $this->op = $this->resolve_op($opname);
    }

    public function resolve_op(string $opname): PeptideLibraryOperation
    {
        // Cache key is `<entity>:<opname>` so two entities with the same op
        // (e.g. both have a "list") get distinct cached Operations. Keying
        // on opname alone caused the first-resolved entity's points to be
        // served to every subsequent entity's call.
        $entname = (is_object($this->entity) && method_exists($this->entity, 'get_name'))
            ? $this->entity->get_name()
            : '_';
        $cacheKey = $entname . ':' . $opname;

        if (isset($this->opmap[$cacheKey])) {
            return $this->opmap[$cacheKey];
        }
        if ($opname === '') {
            return new PeptideLibraryOperation([]);
        }

        $opcfg = \Voxgig\Struct\Struct::getpath($this->config, "entity.{$entname}.op.{$opname}");

        $input = ($opname === 'update' || $opname === 'create' || $opname === 'patch') ? 'data' : 'match';

        $points = [];
        if (is_array($opcfg)) {
            $t = \Voxgig\Struct\Struct::getprop($opcfg, 'points');
            if (is_array($t)) {
                $points = $t;
            }
        }

        $op = new PeptideLibraryOperation([
            'entity' => $entname,
            'name' => $opname,
            'input' => $input,
            'points' => $points,
        ]);
        $this->opmap[$cacheKey] = $op;
        return $op;
    }

    public function make_error(string $code, string $msg): PeptideLibraryError
    {
        return new PeptideLibraryError($code, $msg, $this);
    }

    // The serialised context leaves the pipeline (a logger, a dump), so it
    // is cleaned; the live fields stay raw for the pipeline's own use.
    public function jsonSerialize(): mixed
    {
        $record = [
            'id' => $this->id,
            'op' => $this->op,
            'spec' => $this->spec,
            'entity' => $this->entity,
            'result' => $this->result,
            'response' => $this->response,
            'meta' => $this->meta,
        ];
        $clean = null === $this->utility ? null : $this->utility->clean;
        return is_callable($clean) ? $clean($this, $record) : $record;
    }

    public function __debugInfo(): array
    {
        $record = $this->jsonSerialize();
        return is_array($record) ? $record : ['record' => $record];
    }
}
