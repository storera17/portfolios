// MomentumProdigy desktop shell (Tauri 2).
// The entire application lives in the bundled web assets (../dist); this
// shell provides the native window, offline file: serving, and a place to
// attach an optional llama.cpp sidecar for the upgraded local tutor model
// (see docs/OFFLINE_AI.md).
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running MomentumProdigy");
}
