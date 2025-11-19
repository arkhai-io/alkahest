use pyo3::PyErr;

/// Maps eyre::Error to PyRuntimeError
pub fn map_eyre_to_pyerr(err: eyre::Error) -> PyErr {
    pyo3::exceptions::PyRuntimeError::new_err(format!("{}", err))
}

/// Maps parse errors to PyValueError
pub fn map_parse_to_pyerr<T: std::fmt::Display>(err: T) -> PyErr {
    pyo3::exceptions::PyValueError::new_err(format!("Parse error: {}", err))
}

/// Maps serde errors to PyValueError
pub fn map_serde_to_pyerr<T: std::fmt::Display>(err: T) -> PyErr {
    pyo3::exceptions::PyValueError::new_err(format!("Serialization error: {}", err))
}

/// Maps alloy sol types decode errors to PyValueError
pub fn map_sol_decode_to_pyerr(err: alloy::sol_types::Error) -> PyErr {
    pyo3::exceptions::PyValueError::new_err(format!("Sol decode error: {}", err))
}
