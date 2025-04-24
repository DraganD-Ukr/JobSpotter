package org.jobspotter.user.model;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * The type of user address.
 */
@Schema(enumAsRef = true)
public enum AddressType {
    HOME,
    WORK,
    OTHER
}