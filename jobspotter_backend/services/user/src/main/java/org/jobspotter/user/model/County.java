package org.jobspotter.user.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.jobspotter.user.dto.deserializer.CountyDeserializer;

@JsonDeserialize(using = CountyDeserializer.class)
public enum County {
    Carlow,
    Cavan,
    Clare,
    Cork,
    Donegal,
    Dublin,
    Galway,
    Kerry,
    Kildare,
    Kilkenny,
    Laois,
    Leitrim,
    Limerick,
    Longford,
    Louth,
    Mayo,
    Meath,
    Monaghan,
    Offaly,
    Roscommon,
    Sligo,
    Tipperary,
    Waterford,
    Westmeath,
    Wexford,
    Wicklow
}
