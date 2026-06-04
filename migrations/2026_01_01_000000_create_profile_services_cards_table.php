<?php

use Flarum\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

return Migration::createTable('profile_services_cards', function (Blueprint $table): void {
    $table->increments('id');
    $table->unsignedInteger('user_id')->unique();
    $table->string('title', 100);
    $table->string('category', 80)->nullable();
    $table->text('description');
    $table->string('availability', 20)->default('available')->index();
    $table->string('price_label', 100)->nullable();
    $table->string('external_url', 2048)->nullable();
    $table->string('contact_label', 160)->nullable();
    $table->boolean('is_public')->default(true)->index();
    $table->string('status', 20)->default('approved')->index();
    $table->timestamp('created_at')->nullable();
    $table->timestamp('updated_at')->nullable();
    $table->timestamp('approved_at')->nullable();
    $table->unsignedInteger('approved_by_user_id')->nullable()->index();
    $table->timestamp('rejected_at')->nullable();
    $table->unsignedInteger('rejected_by_user_id')->nullable()->index();

    $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
    $table->foreign('approved_by_user_id')->references('id')->on('users')->nullOnDelete();
    $table->foreign('rejected_by_user_id')->references('id')->on('users')->nullOnDelete();
});
