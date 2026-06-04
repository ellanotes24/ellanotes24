<?php

namespace EllaNotes\ProfileServicesCard\Model;

use Flarum\Database\AbstractModel;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string|null $category
 * @property string $description
 * @property string $availability
 * @property string|null $price_label
 * @property string|null $external_url
 * @property string|null $contact_label
 * @property bool $is_public
 * @property string $status
 */
class ProfileServicesCard extends AbstractModel
{
    public const STATUS_APPROVED = 'approved';
    public const STATUS_PENDING = 'pending';
    public const STATUS_REJECTED = 'rejected';

    public const AVAILABILITY_AVAILABLE = 'available';
    public const AVAILABILITY_BUSY = 'busy';
    public const AVAILABILITY_UNAVAILABLE = 'unavailable';

    protected $table = 'profile_services_cards';

    protected $fillable = [
        'user_id',
        'title',
        'category',
        'description',
        'availability',
        'price_label',
        'external_url',
        'contact_label',
        'is_public',
        'status',
        'approved_at',
        'approved_by_user_id',
        'rejected_at',
        'rejected_by_user_id',
    ];

    protected $casts = [
        'is_public' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by_user_id');
    }

    public function rejectedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'rejected_by_user_id');
    }
}
