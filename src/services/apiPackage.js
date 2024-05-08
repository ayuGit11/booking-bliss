import supabase, { supabaseUrl } from "./supabase";
export async function getPackages() {
  const { data, error } = await supabase.from("packages").select("*");
  if (error) {
    console.log(error);
    throw new Error("Package could not be loaded");
  }
  return data;
}

export async function createEditPackage(newPackage, id) {
  const hasImagePath = newPackage.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newPackage.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newPackage.image
    : `${supabaseUrl}/storage/v1/object/public/package/${imageName}`;

  // 1. Create/edit cabin
  //https://tnbnzgnztbodhoyhfxmd.supabase.co/storage/v1/object/sign/cabin-images/0.0459892854419246-cabin-002.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbi1pbWFnZXMvMC4wNDU5ODkyODU0NDE5MjQ2LWNhYmluLTAwMi5qcGciLCJpYXQiOjE3MTIzNzQ4MTUsImV4cCI6MTc0MzkxMDgxNX0.I5nq1UjXYWJyO8wxKsjGL0GhEnKYg7TFGL9rK0KiMk0&t=2024-04-06T03%3A40%3A15.247Z
  let query = supabase.from("packages");

  // A) CREATE
  if (!id) query = query.insert([{ ...newPackage, image: imagePath }]);

  // B) EDIT
  if (id)
    query = query.update({ ...newPackage, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Package could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("package")
    .upload(imageName, newPackage.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("packages").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Package image could not be uploaded and the package was not created"
    );
  }

  return data;
}
export async function deletePackage(id) {
  const { data, error } = await supabase.from("packages").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Package could not be deleted");
  }
  return data;
}
