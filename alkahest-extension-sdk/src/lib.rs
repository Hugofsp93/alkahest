//! Alkahest Extension SDK
//!
//! Build native Alkahest extensions in Rust. Extensions compile to WASM
//! components via `cargo build --target wasm32-wasip2` and are loaded
//! directly by the Alkahest runtime — no Node.js required.
//!
//! # Quick Start
//!
//! ```toml
//! [dependencies]
//! alkahest-extension-sdk = "0.1"
//! ```
//!
//! ```rust,ignore
//! use alkahest_extension_sdk::prelude::*;
//!
//! struct MyExtension;
//!
//! impl AlkahestExtension for MyExtension {
//!     fn activate() -> Result<(), String> {
//!         host::log_info("Hello from my extension!");
//!         Ok(())
//!     }
//!
//!     fn deactivate() {}
//!
//!     fn get_name() -> String {
//!         "My Extension".to_string()
//!     }
//! }
//!
//! export_extension!(MyExtension);
//! ```
//!
//! Then in your extension directory, create a `alkahest.toml`:
//!
//! ```toml
//! [extension]
//! id = "mypublisher.my-extension"
//! name = "My Extension"
//! version = "0.1.0"
//! wasm = "target/wasm32-wasip2/release/my_extension.wasm"
//!
//! [activation]
//! events = ["onLanguage:rust"]
//! ```

wit_bindgen::generate!({
    world: "alkahest-extension",
    path: "wit/world.wit",
    pub_export_macro: true,
});

pub use self::alkahest::extension::common_types::*;
pub use self::alkahest::extension::host_api as host;

/// Re-export the guest trait that extensions must implement.
pub use self::exports::alkahest::extension::extension_api::Guest as AlkahestExtension;

/// Prelude module — import everything you need with `use alkahest_extension_sdk::prelude::*;`
pub mod prelude {
    pub use super::exports::alkahest::extension::extension_api::Guest as AlkahestExtension;
    pub use super::alkahest::extension::common_types::*;
    pub use super::alkahest::extension::host_api as host;
}

/// Macro to export your extension implementation. Call this once at the
/// top level of your crate with your struct that implements `AlkahestExtension`.
#[macro_export]
macro_rules! export_extension {
    ($ty:ident) => {
        ::alkahest_extension_sdk::export!($ty with_types_in ::alkahest_extension_sdk);
    };
}
