import json
import falcon
import pandas as pd
import numpy as np
from falcon_cors import CORS

cors = CORS(allow_origins_list=['http://localhost:1234'])

df = pd.read_csv('./data/hiringmgmtnew.csv')
df = df.dropna(subset=[
    "Pre-Recruitment Process",
    "Recruitment Package Development",
    "Draft Job Opportunity Announcement",
    "Review JOA",
    "Finalize and Post JOA",
    "JOA Open",
    "Review Applicants and Create Cert",
    "Interview and Selection",
    "Tentative Offer",
    "Acceptance",
    "Conduct Checks",
    "Final Offer/ EOD Established",
])
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

df_position = pd.read_csv('./data/position_data.csv')

df_fpac = pd.read_excel('./data/fpac.xlsx')

def normalizeSeries(series):
    length = len(str(series))
    if length == 4:
        return str(series)
    else:
        lead = "0"*(4-length)
        return lead + str(series)


df_position['series'] = df_position['series'].apply(normalizeSeries)


def normalizeGrade(grade):
    result = [grade.replace('"', '') for grade in grade.split(",")]
    return result


df_position['grades'] = df_position['grades'].apply(normalizeGrade)


def normalizePosTitleVar(pos):
    result = [p.replace('"', '') for p in pos.split(",")]
    return result


df_position['positionTitleVariations'] = df_position['positionTitleVariations'].apply(
    normalizePosTitleVar)


class TestResource(object):

    def on_get(self, req, resp):
        list_dict_data = df_test.to_dict(orient='record')
        data = {'columns': df_test_columns, 'data': list_dict_data}
        resp.body = json.dumps(data, ensure_ascii=False)
        resp.status = falcon.HTTP_200


class HiringOrgResource(object):

    def on_get(self, req, resp):
        # list_dict_data = df_hiring_org.to_dict(orient='record')
        # data = {'columns': df_hiring_org_columns, 'data': list_dict_data}
        with open('./data/orgDataNew.json') as file:
            data = json.load(file)
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


class PositionResource(object):

    def on_get(self, req, resp):
        resp.body = json.dumps(df_position.to_dict(
            orient='records'), indent=2, sort_keys=True, ensure_ascii=False)
        resp.status = falcon.HTTP_200

def default(o):
    if isinstance(o, (date, datetime)):
        return o.strftime('%m-%d-%Y')

class FpacResource(object):

    def on_get(self, req, resp):
        resp.body = json.dumps(df_fpac.to_dict(
            orient='records'), indent=2, sort_keys=True, ensure_ascii=False, default=default)
        resp.status = falcon.HTTP_200

api = falcon.API(middleware=[cors.middleware])

hiring_resource = HiringResource()
hiring_org_resource = HiringOrgResource()
test_resource = TestResource()
skill_resource = SkillResource()
position_resource = PositionResource()
fpac_resource = FpacResource()


api.add_route('/position', hiring_resource)
api.add_route('/org', hiring_org_resource)
api.add_route('/test', test_resource)
api.add_route('/skill', skill_resource)
api.add_route('/positions', position_resource)
api.add_route('/fpac', fpac_resource)
