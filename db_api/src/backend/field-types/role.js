"use strict";

const Sealious = require("sealious");

const allowed_roles = new Map();

allowed_roles.set("admin", [
	"admin",
	"komisja_lokalna",
	"komisja_centralna",
	"voter",
]);
allowed_roles.set("komisja_centralna", ["komisja_lokalna", "voter"]);
allowed_roles.set("komisja_lokalna", []);
allowed_roles.set("voter", []);
allowed_roles.set(null, ["voter"]);

function decide(role, target_role) {
	if (allowed_roles.get(role).indexOf(target_role) !== -1) {
		return Promise.resolve();
	} else {
		return Promise.reject("Invalid role: " + target_role);
	}
}

module.exports = function(app) {
	return app.createChip(Sealious.FieldType, {
		name: "role",
		extends: "text",
		is_proper_value: function(context, params, new_value) {
			if (context.is_super) {
				return Promise.resolve();
			}
			const user_id = context.user_id;

			return app
				.run_action(
					context,
					["collections", "users", user_id],
					"show",
					{ format: { role: "original" } }
				)
				.then(user => decide(user.body.role, new_value))
				.catch({ type: "not_found" }, () => decide(null, new_value));
		},
	});
};