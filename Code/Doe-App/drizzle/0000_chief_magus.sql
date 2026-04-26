CREATE TABLE `consent_events` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`action` text NOT NULL,
	`detail` text,
	`occurred_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `consent_events_user_idx` ON `consent_events` (`user_id`,`occurred_at`);--> statement-breakpoint
CREATE TABLE `cycle_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`cycle_profile_id` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer,
	`cycle_length` integer,
	`flow` text,
	`notes` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`cycle_profile_id`) REFERENCES `cycle_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `cycle_entries_profile_start_idx` ON `cycle_entries` (`cycle_profile_id`,`start_date`);--> statement-breakpoint
CREATE TABLE `cycle_predictions` (
	`id` text PRIMARY KEY NOT NULL,
	`cycle_profile_id` text NOT NULL,
	`menstrual_start` integer NOT NULL,
	`menstrual_end` integer NOT NULL,
	`follicular_start` integer NOT NULL,
	`follicular_end` integer NOT NULL,
	`ovulation_date` integer NOT NULL,
	`luteal_start` integer NOT NULL,
	`luteal_end` integer NOT NULL,
	`confidence` real NOT NULL,
	`algorithm_used` text NOT NULL,
	`generated_at` integer NOT NULL,
	FOREIGN KEY (`cycle_profile_id`) REFERENCES `cycle_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `cycle_predictions_profile_gen_idx` ON `cycle_predictions` (`cycle_profile_id`,`generated_at`);--> statement-breakpoint
CREATE TABLE `cycle_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`cycle_pattern` text DEFAULT 'UNKNOWN' NOT NULL,
	`average_cycle_length` integer,
	`average_period_length` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cycle_profiles_user_id_unique` ON `cycle_profiles` (`user_id`);--> statement-breakpoint
CREATE TABLE `permission_sets` (
	`id` text PRIMARY KEY NOT NULL,
	`share_contact_id` text NOT NULL,
	`can_see_cycle_phase` integer DEFAULT false NOT NULL,
	`can_see_mood` integer DEFAULT false NOT NULL,
	`can_see_exact_dates` integer DEFAULT false NOT NULL,
	`can_see_symptoms` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`share_contact_id`) REFERENCES `share_contacts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `permission_sets_share_contact_id_unique` ON `permission_sets` (`share_contact_id`);--> statement-breakpoint
CREATE TABLE `share_contacts` (
	`id` text PRIMARY KEY NOT NULL,
	`share_profile_id` text NOT NULL,
	`display_name` text NOT NULL,
	`role` text NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`share_profile_id`) REFERENCES `share_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `share_contacts_profile_idx` ON `share_contacts` (`share_profile_id`);--> statement-breakpoint
CREATE TABLE `share_links` (
	`id` text PRIMARY KEY NOT NULL,
	`share_contact_id` text NOT NULL,
	`encrypted_token` text NOT NULL,
	`expires_at` integer,
	`revoked_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`share_contact_id`) REFERENCES `share_contacts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `share_links_contact_idx` ON `share_links` (`share_contact_id`);--> statement-breakpoint
CREATE TABLE `share_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `share_profiles_user_id_unique` ON `share_profiles` (`user_id`);--> statement-breakpoint
CREATE TABLE `symptom_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`tag_id` text NOT NULL,
	`cycle_entry_id` text,
	`severity` integer NOT NULL,
	`logged_at` integer NOT NULL,
	`note` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `symptom_tags`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`cycle_entry_id`) REFERENCES `cycle_entries`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `symptom_logs_user_logged_idx` ON `symptom_logs` (`user_id`,`logged_at`);--> statement-breakpoint
CREATE INDEX `symptom_logs_tag_idx` ON `symptom_logs` (`tag_id`);--> statement-breakpoint
CREATE TABLE `symptom_tags` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`icon` text,
	`color` text,
	`is_custom` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `symptom_tags_user_name_uq` ON `symptom_tags` (`user_id`,`name`);--> statement-breakpoint
CREATE TABLE `sync_devices` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`device_name` text NOT NULL,
	`device_public_key` text NOT NULL,
	`last_synced_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `sync_devices_user_idx` ON `sync_devices` (`user_id`);--> statement-breakpoint
CREATE TABLE `user_settings` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`cloud_sync_enabled` integer DEFAULT false NOT NULL,
	`light_theme_id` text,
	`dark_theme_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_settings_user_id_unique` ON `user_settings` (`user_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`display_name` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `widgets` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`type` text NOT NULL,
	`size` text NOT NULL,
	`config` text,
	`position` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `widgets_user_idx` ON `widgets` (`user_id`);