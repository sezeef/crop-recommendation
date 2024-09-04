import pandas as pd
import pickle as pkl
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.ensemble import GradientBoostingClassifier

df = pd.read_csv("Crop_recommendation.csv")

c = df.label.astype("category")
targets = dict(enumerate(c.cat.categories))
df["target"] = c.cat.codes

y = df.target
X = df[['N','P','K','temperature','humidity','ph','rainfall']]

means = [round(x, 2) for x in X.mean().tolist()]

X_train, X_test, y_train, y_test = train_test_split(X, y,random_state=1)
scaler = MinMaxScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

model_grad = GradientBoostingClassifier().fit(X_train, y_train)

with open("model.pkl", "wb") as file:
    pkl.dump(model_grad, file)
