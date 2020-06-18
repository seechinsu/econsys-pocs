import json
import falcon
import pandas as pd
import numpy as np
from falcon_cors import CORS

cors = CORS(allow_origins_list=['http://localhost:1234'])

df = pd.read_csv('./data/hiringmgmt.csv')
df = df.dropna(subset=['Duration1', 'Duration2', 'Duration3', 'Duration4', 'Duration5',
                       'Duration6', 'Duration7', 'Duration8', 'Duration9', 'Duration10', 'Duration11', 'Duration12'])
df = df.replace({np.nan: None})
df_columns = df.columns.tolist()

df_test = pd.read_csv('./data/test.csv')
df_test = df_test.replace({np.nan: None})
df_test_columns = df_test.columns.tolist()

df_skill = pd.read_csv('./data/skillsData.csv')
df_skill = df_skill.replace({np.nan: None})
df_skill_columns = df_skill.columns.tolist()

df_hiring_org = pd.read_csv('./data/hiringOrg.csv')
df_hiring_org = df_hiring_org.replace({np.nan: None})
df_hiring_org_columns = df_hiring_org.columns.tolist()


class TestResource(object):

    def on_get(self, req, resp):
        list_dict_data = df_test.to_dict(orient='record')
        data = {'columns': df_test_columns, 'data': list_dict_data}
        resp.body = json.dumps(data, ensure_ascii=False)
        resp.status = falcon.HTTP_200


class HiringOrgResource(object):

    def on_get(self, req, resp):
        list_dict_data = df_hiring_org.to_dict(orient='record')
        data = {'columns': df_hiring_org_columns, 'data': list_dict_data}
        resp.body = json.dumps(data, ensure_ascii=False)
        resp.status = falcon.HTTP_200


class HiringResource(object):

    def on_get(self, req, resp):
        list_dict_data = df.to_dict(orient='record')
        sorted_data = sorted(
            list_dict_data, key=lambda row: row["Total Duration for Case"])
        data = {'columns': df_columns, 'data': sorted_data}
        resp.body = json.dumps(data, ensure_ascii=False)
        resp.status = falcon.HTTP_200


class SkillResource(object):

    def on_get(self, req, resp):
        list_dict_data = df_skill.to_dict(orient='record')
        data = {'columns': df_skill_columns, 'data': list_dict_data}
        resp.body = json.dumps(data, ensure_ascii=False)
        resp.status = falcon.HTTP_200


api = falcon.API(middleware=[cors.middleware])

hiring_resource = HiringResource()
hiring_org_resource = HiringOrgResource()
test_resource = TestResource()
skill_resource = SkillResource()

api.add_route('/position', hiring_resource)
api.add_route('/org', hiring_org_resource)
api.add_route('/test', test_resource)
api.add_route('/skill', skill_resource)
