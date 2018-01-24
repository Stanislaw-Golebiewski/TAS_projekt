"use strict";

module.exports = function(App) {
	return App.createCollection({
		name: "admins",
		fields: [
			{
				name: "user",
				type: "single_reference",
				params: { collection: "users" },
				required: true,
			},
			{
				name: "email",
				type: "email",
				required: true,
			},
		],
		access_strategy: {
			default: ["roles", ["admin"]],
			delete: "noone",
		},
	});
};
