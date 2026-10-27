import { Profile, ProfileSchema } from "@/types/content";
import profileData from "@/content/profile.json";

let _profile: Profile | null = null;

export function getProfile(): Profile {
  if (_profile) return _profile;
  _profile = ProfileSchema.parse(profileData);
  return _profile;
}
