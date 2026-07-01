const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_SERVICE_ROLE_KEY
);

const uploadToSupabase = async({ path, buffer, filetype }) => {
	const result = await supabase.storage
		.from("UserFiles")
		.upload(path, buffer, {
			contentType: filetype
		});

	return result;
}

module.exports = supabase;