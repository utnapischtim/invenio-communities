# -*- coding: utf-8 -*-
#
# Copyright (C) 2022 Northwestern University.
#
# Invenio-Communities is free software; you can redistribute it and/or modify
# it under the terms of the MIT License; see LICENSE file for more details.

from invenio_db import db
from invenio_records.systemfields import ConstantField, ModelField
from invenio_records_resources.records.api import Record
from invenio_records_resources.records.systemfields import IndexField

from .models import MemberModel


class Member(Record):
    """A Request Event."""

    model_cls = MemberModel

    # Systemfields

    metadata = None

    index = IndexField(
        "community_members-member-v1.0.0", search_alias="community_members"
    )
    """The ES index used."""

    community_id = ModelField("community_id")
    """The data-layer UUID of the community."""

    user_id = ModelField("user_id")
    """The data-layer id of the user (or None)."""

    # TODO: add group
    # TODO: add role + visibility


    @classmethod
    def get_record(cls, id_, with_deleted=True):
        """Return Member."""

        with db.session.no_autoflush:
            query = cls.model_cls.query.filter_by(**id_)
            if not with_deleted:
                query = query.filter(cls.model_cls.is_deleted != True)
            obj = query.one()
            return cls(obj.data, model=obj)
