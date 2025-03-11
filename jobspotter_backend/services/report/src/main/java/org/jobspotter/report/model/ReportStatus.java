package org.jobspotter.report.model;


public enum ReportStatus {

    OPEN,          // Report has been submitted and is awaiting review.

    UNDER_REVIEW,  // Report is currently being investigated by a moderator/admin.

    PENDING_RESPONSE, // Report is waiting for further information or clarification, potentially from the reporter or reported user.

    RESOLVED,      // Report has been fully investigated and a resolution has been reached.

    REJECTED,      // Report has been reviewed and deemed invalid, frivolous, or not actionable.

    ACTION_TAKEN,  //  Action has been taken as a result of the report (e.g., content removed, user warned, account suspended).

    ESCALATED,     // Report has been escalated to a higher level of review or a specialized team.

    ON_HOLD,       // Review is temporarily paused, pending external factors or information.

    AUTO_RESOLVED  // Report was automatically resolved by system (e.g., spam filter).
}
